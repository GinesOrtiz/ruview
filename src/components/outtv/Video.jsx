import React from "react";
import { outtvClient as axios } from "../../services/client";
import Loading from "../common/Loading";
import Player from "./Player";
import "./home.css";

class Video extends React.Component {
  state = {
    video: null
  };

  getProperty(content, key) {
    const element = content.attributes.find(e => e.key === key);
    return element ? element.value : null;
  }

  componentDidMount = () => {
    axios.get(`/item/${this.props.match.params.id}`).then(e => {
      this.setState({
        video: this.getProperty(e.data, "video-url"),
        subtitles: e.data.subtitles
      });
    });
  };

  render() {
    return (
      <div className="video-section">
        {!this.state.video && <Loading text="Loading content" />}
        <Player src={this.state.video} subtitles={this.state.subtitles} />
        {/*<ReactPlayer className="video" url={this.state.video} controls />*/}
      </div>
    );
  }
}

export default Video;
