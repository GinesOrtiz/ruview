import React from "react";
import Hotkeys from "react-hot-keys";
import ReactPlayer from "react-player";

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

const Player = props => (
  <Hotkeys
    keyName="space, left, right, up, down, f, esc, m"
    onKeyDown={onKeyDown}
  >
    <ReactPlayer
      className="video"
      controls
      autoPlay="true"
      url={props.src}
      onLoadedMetadata={props.onLoad}
      onTimeUpdate={props.onTimeUpdate}
      config={{
        file: {
          tracks: props.subtitles
            ? props.subtitles.map(e => ({
                kind: "subtitles",
                src: `https://ruview.misly.es/subs.php?f=${e.file}`,
                srcLang: e.srclang
              }))
            : []
        }
      }}
    />
  </Hotkeys>
);

export default Player;
