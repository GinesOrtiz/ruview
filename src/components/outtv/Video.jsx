import React from "react";
import { outtvClient as axios } from "../../services/client";
import Loading from "../common/Loading";
import dashjs from "dashjs";
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
      console.log(this.getProperty(e.data, "video-url"));
      let video = this.getProperty(e.data, "video-url");
      video = video.replace("http", "https");

      try {
        const player = dashjs.MediaPlayer().create();
        player.initialize(document.querySelector("video"), video, true);
      } catch (e) {}
      this.setState({ video });
    });
  };

  render() {
    return (
      <div className="video-section">
        {!this.state.video && <Loading text="Loading content" />}
        <video controls />
      </div>
    );
  }
}

export default Video;
