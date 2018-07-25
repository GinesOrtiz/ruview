/* globals ga */
import React from "react";
import axios from "../../services/client";
import Loading from "../common/Loading";
import history from "../../store/history";

class Movie extends React.Component {
  state = {};
  componentWillMount = () => {
    ga('send', 'event', 'Movie', this.props.match.params.id);
    axios.get(`/?c=${this.props.match.params.id}&s=seasons`).then(e => {
        history.push(`/movie/${e.data[0].id}`);
    });
  };

  render() {
    return <Loading text="Loading content" />;
  }
}

export default Movie;
