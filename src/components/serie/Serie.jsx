/* globals ga */

import React from "react";
import axios from "../../services/client";
import Loading from "../common/Loading";
import history from "../../store/history";
import SerieDescription from "./SerieDescription";
import SerieSeasons from "./SerieSeasons";
import SerieEpisodes from "./SerieEpisodes";
import "./serie.css";

class Serie extends React.Component {
  state = {
    info: null,
    seasons: null,
    episodes: null,
    activeSeason: null
  };

  componentWillMount = () => {
    axios.get(`/?c=${this.props.match.params.id}&s=info`).then(e => {
      this.setState({ info: e.data });
      ga("send", "event", "Serie", e.data.name);
    });

    axios.get(`/?c=${this.props.match.params.id}&s=seasons`).then(e => {
      this.setState({ seasons: e.data });
      if (e.data.length && !this.state.activeSeason) {
        const seasonStore = JSON.parse(
          localStorage.getItem(`show-${this.props.match.params.id}`)
        );

        this.setState({ activeSeason: seasonStore || e.data[0].id });
        this.onSeasonClick(seasonStore || e.data[0].id);
      }
    });
  };

  onSeasonClick = season => {
    this.setState({ activeSeason: season, episodes: null });
    localStorage.setItem(
      `show-${this.props.match.params.id}`,
      JSON.stringify(season)
    );

    axios.get(`/?c=${season}&s=season`).then(e => {
      this.setState({ episodes: e.data });
    });
  };

  onMediaCardClick = episode => {
    localStorage.setItem(
      "currentEpisodePlaying",
      JSON.stringify({
        episode: parseInt(episode, 10),
        season: parseInt(this.state.activeSeason, 10),
        show: parseInt(this.props.match.params.id, 10)
      })
    );
    history.push(`/video/${episode}`);
  };

  render() {
    if (this.state.info && this.state.seasons) {
      return (
        <div className="serie-section">
          <SerieDescription {...this.state.info} />
          <div className="row">
            <div className="col col-md-2 col-sm-4 col-lg-2 col-xs-12">
              <h5 className="default-title">Seasons</h5>
              <SerieSeasons
                activeSeason={this.state.activeSeason}
                seasons={this.state.seasons}
                onSeasonClick={this.onSeasonClick}
              />
            </div>
            <div className="col col-md-10 col-sm-8 col-lg-10 col-xs-12 episodes-column">
              <h5 className="default-title">Episodes</h5>
              {this.state.episodes ? (
                <SerieEpisodes
                  episodes={this.state.episodes}
                  onMediaCardClick={this.onMediaCardClick}
                />
              ) : (
                <Loading text="Loading content" />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading text="Loading content" />;
    }
  }
}

export default Serie;
