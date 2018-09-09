/* globals videojs */
import React from "react";
import { rakutenClient as axios } from "../../services/client";
import Loading from "../common/Loading";
import Icon from "../common/Icon";
import { Button } from "reactstrap";
import "./rakuten.css";
import Hotkeys from "react-hot-keys";

class Player extends React.Component {
  state = {
    audio: null,
    subtitles: null,
    video: null,
    showViewOptions: true,
    currentOption: null
  };

  getProperty(content, key) {
    const element = content.attributes.find(e => e.key === key);
    return element ? element.value : null;
  }

  componentDidMount = () => {
    axios
      .get(`?s=info&t=${this.props.contentType}&c=${this.props.id}`)
      .then(e => {
        const streams = e.data.data.view_options.private.streams;

        let audio = [];
        let subtitles = [];

        streams.forEach(e => {
          audio = [...audio, e.audio_languages];
          subtitles = [...subtitles, e.subtitle_languages];
        });

        this.setState({
          audio,
          subtitles,
          audioUser: audio[0].id,
          subtitlesUser: subtitles[0].id,
          streams
        });
      });
  };

  selectSource = (t, e, i) => {
    const state = {};

    if (this.state.currentOption !== i) {
      state.audioUser = null;
      state.subtitlesUser = null;
    }

    state.currentOption = i;
    state[`${t}User`] = e.id;

    this.setState(state);
  };

  playContent = () => {
    if (!this.state.audioUser || !this.state.subtitlesUser) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false, showViewOptions: false });

    const paramsId = this.props.id;
    const audioUser = this.state.audioUser;
    const subtitlesUser = this.state.subtitlesUser;
    axios
      .get(
        `?s=media&t=${
          this.props.contentType
        }&c=${paramsId}&lv=${audioUser}&ls=${subtitlesUser}`
      )
      .then(e => {
        const data = e.data.data.stream_infos[0];
        this.preparePlayer(data.url, data.license_url);
      });
  };

  preparePlayer = (src, serverURL) => {
    const video = document.createElement("video");
    const player = videojs(video);

    video.controls = true;
    player.src({
      src,
      type: "application/dash+xml",
      keySystemOptions: [
        {
          name: "com.widevine.alpha",
          options: {
            serverURL
          }
        }
      ]
    });
    player.play();
    document.querySelector(".video-container").innerHTML = "";
    document.querySelector(".video-container").appendChild(video);
  };

  render() {
    const onKeyDown = key => {
      const player = document.querySelector("video");

      switch (key) {
        case "space":
          player[player.paused ? "play" : "pause"]();
          break;
        case "m":
          player.muted = !player.muted;
          break;
        case "right":
          player.currentTime += 5;
          break;
        case "left":
          player.currentTime -= 5;
          break;
        case "up":
          if (player.volume < 1) {
            player.volume += 0.1;
          }
          break;
        case "down":
          if (player.volume > 0.1) {
            player.volume -= 0.1;
          }
          break;
        case "f":
          if (player.isFullScreen) {
            player.isFullScreen = false;
            player.webkitExitFullScreen();
          } else {
            player.isFullScreen = true;
            player.requestFullscreen();
          }
          break;
        case "esc":
          player.isFullScreen = false;
          player.webkitExitFullScreen();
          break;
      }
    };
    const translate = text => {
      switch (text) {
        case "Inglés":
          return "English";
        case "Español":
          return "Spanish";
        case "Sin subtítulos":
          return "No subtitles";
        case "Francés":
          return "French";
        default:
          return text;
      }
    };
    const SelectOptions = props =>
      props.source.map(e => (
        <Button
          key={e.name}
          color={this.state[`${props.type}User`] === e.id ? "success" : "white"}
          disabled={
            props.type === "subtitles" && props.opt !== this.state.currentOption
          }
          onClick={() => props.selectSource(props.type, e, props.opt)}
        >
          {translate(e.name)}
        </Button>
      ));

    const ViewOptions = () => (
      <div className="video-options">
        <div>
          {["audio", "subtitles"].map(source => (
            <div key={source}>
              <h3>
                {source === "audio" ? "Audio language" : "Subtitles language"}
              </h3>
              <div className="mb-3">
                <div className="btn-group">
                  {this.state[source].map((e, i) => (
                    <SelectOptions
                      key={e.id}
                      selectSource={this.selectSource}
                      source={e}
                      type={source}
                      opt={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={this.playContent} color="primary">
          Play
        </Button>
        <Button
          onClick={() => this.setState({ showViewOptions: false })}
          color="secondary"
          className="view-options-toggle"
        >
          <Icon type="close" size="24" />
        </Button>
      </div>
    );

    if (!this.state.audio && !this.state.subtitles) {
      return <Loading text="Loading content" />;
    }

    return (
      <div className="video-section">
        {this.state.showViewOptions && <ViewOptions />}
        {!this.state.showViewOptions && (
          <Button
            className="view-options-toggle"
            onClick={() => this.setState({ showViewOptions: true })}
          >
            <Icon type="g_translate" />
          </Button>
        )}
        <Hotkeys
          keyName="space, left, right, up, down, f, esc, m"
          onKeyDown={onKeyDown}
        >
          <div className="video-container" />
        </Hotkeys>
      </div>
    );
  }
}

export default Player;
