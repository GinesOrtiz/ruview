/* globals videojs */

import React from "react";
import { rakutenClient as axios } from "../../services/client";
import Player from "./Player";
import Loading from "../common/Loading";
import { ListGroup, ListGroupItem } from "reactstrap";
import MediaCard from "../common/mediaCard/MediaCard";

class Serie extends React.Component {
  state = {
    activeSeason: null,
    seasons: null,
    episodes: null
  };

  componentDidMount = () => {
    axios.get(`?s=info&t=tv_shows&c=${this.props.match.params.id}`).then(e => {
      this.setState({
        seasons: e.data.data.seasons,
        name: e.data.data.title,
        activeSeason: e.data.data.seasons[0].id
      });
      axios.get(`?s=season&c=${this.state.seasons[0].id}`).then(e => {
        this.setState({ episodes: e.data.data.episodes });
      });
    });
  };

  changeSeason = id => {
    this.setState({ activeSeason: id, episodes: null });
    axios.get(`?s=season&c=${id}`).then(e => {
      this.setState({ episodes: e.data.data.episodes });
    });
  };

  render() {
    if (!this.state.seasons) {
      return <Loading text="Loading content" />;
    }
    return (
      <div class="row home-section">
        <div class="w-100">
          <h1 className="pl-3 pr-3 pt-3 title">{this.state.name}</h1>
        </div>
        <div class="col col-md-3 col-lg-2 p-3">
          <ListGroup>
            {Object.values(this.state.seasons).map(e => (
              <ListGroupItem
                onClick={() => this.changeSeason(e.id)}
                className={this.state.activeSeason === e.id ? "active" : ""}
              >
                {e.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div className="col col-md-9 col-lg-10 p-3">
          <div className="row align-items-center">
            {!this.state.episodes && <Loading text="Loading content" />}
            {this.state.episodes &&
              this.state.episodes.map(e => (
                <div className="col media-content" key={e.id}>
                  <MediaCard
                    type="rakuten/episode"
                    id={e.id}
                    name={e.title}
                    thumbnail={e.images.snapshot}
                    cardType="with-content"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Serie;
