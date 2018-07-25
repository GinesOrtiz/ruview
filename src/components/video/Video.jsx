/* globals ga */

import React from "react";
import Loading from "../common/Loading";
import axios from "../../services/client";
import history from "../../store/history";
import QualitySelector from "../common/qualitySelector/QualitySelector.jsx";
import Player from "../player/Player";
import ShareButton from "../common/ShareButton";
import "./video.css";

class Video extends React.Component {
  state = {
    options: null,
    currentTime: null,
    currentPercentage: null,
    episode: null,
    seasonContent: null,
    currentQualityOption: null,
    isVideo: this.props.match.path === "/video/:id"
  };

  componentWillMount = () => {
    const video =
      JSON.parse(localStorage.getItem(`video-${this.props.match.params.id}`)) ||
      {};
    const currentEpisode = JSON.parse(
      localStorage.getItem("currentEpisodePlaying")
    );
    const userQuality =
      JSON.parse(localStorage.getItem("defaultQuality")) || "1080p";

    axios.get(`?c=${this.props.match.params.id}&s=episode`).then(e => {
      this.setState({
        options: e.data,
        currentTime: video.current || 0,
        currentPercentage: video.percentage || 0,
        currentQualityOption: e.data.find(e => e.quality === userQuality)
      });
    });

    if (this.state.isVideo) {
      axios.get(`/?c=${currentEpisode.season}&s=season`).then(e => {
        const episode = e.data.findIndex(e => e.id === currentEpisode.episode);

        this.setState({ seasonContent: e.data, episode });
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.componentWillMount();
    }
  };

  onTimeUpdate = event => {
    const video = event.target;

    if (!parseInt(video.currentTime, 10) % 10) {
      ga("send", "event", "Playing", {
        media: this.props.match.params.id,
        time: video.currentTime
      });
    }

    localStorage.setItem(
      `video-${this.props.match.params.id}`,
      JSON.stringify({
        current: video.currentTime,
        percentage: video.currentTime / video.duration * 100
      })
    );

    if (video.currentTime === video.duration && this.state.isVideo) {
      this.playNextEpisode();
    }
  };

  playNextEpisode = () => {
    const currentEpisode = JSON.parse(
      localStorage.getItem("currentEpisodePlaying")
    );

    const currentSeason = this.state.seasonContent;
    const current = this.state.episode;

    if (current + 1 < currentSeason.length - 1) {
      localStorage.setItem(
        "currentEpisodePlaying",
        JSON.stringify({
          ...currentEpisode,
          episode: parseInt(currentSeason[current + 1].id, 10)
        })
      );
      history.push(`/video/${currentSeason[current + 1].id}`);
    }
  };

  onLoad = event => {
    const target = event.target;

    if (this.state.currentTime && this.state.currentPercentage < 95) {
      target.currentTime = this.state.currentTime;
    }
  };

  onQualityChange = qualitySelector => {
    const quality = qualitySelector.target.value;

    this.setState({
      currentQualityOption: this.state.options.find(e => e.quality === quality)
    });
    localStorage.setItem("defaultQuality", JSON.stringify(quality));
  };

  render() {
    if (!this.state.options) {
      return <Loading text="Loading content" />;
    }

    const subtitles =
      this.state.seasonContent &&
      this.state.seasonContent[this.state.episode].subtitles;

    return (
      <div className="video-section">
        {this.state.seasonContent && (
          <ShareButton name={this.state.seasonContent[0].name} fixed />
        )}
        <QualitySelector
          options={this.state.options}
          onQualityChange={this.onQualityChange}
          currentOption={this.state.currentQualityOption}
        />
        <Player
          src={this.state.currentQualityOption.link}
          onLoad={this.onLoad}
          onTimeUpdate={this.onTimeUpdate}
          subtitles={subtitles}
        />
      </div>
    );
  }
}

export default Video;
