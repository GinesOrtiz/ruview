/* globals videojs */

import React from "react";
import { rakutenClient as axios } from "../../services/client";
import Player from "./Player";

class Video extends React.Component {
  state = {};

  render() {
    return <Player id={this.props.match.params.id} contentType="movies" />;
  }
}

export default Video;
