/* globals ga */

import React from "react";
import { Alert } from "reactstrap";
import { rakutenClient as axios } from "../../services/client";
import Loading from "../common/Loading";
import MediaCard from "../common/mediaCard/MediaCard";
import Icon from "../common/Icon";
import "../home/home.css";

class Home extends React.Component {
  state = {
    content: null,
    userSeries: null,
    search: "",
    iOS: false
  };

  componentWillMount = () => {
    //ga("send", "event", "Page", this.props.section || "home");
    this.requestMainContent(this.state.section);
    if (
      window.navigator.userAgent.includes("iPhone") ||
      window.navigator.userAgent.includes("iPad")
    ) {
      this.setState({ iOS: true });
    }
  };

  requestMainContent = () => {
    axios.get("?s=content").then(e => {
      this.setState({ content: e.data.data });
    });
  };

  onSearch = e => {
    this.setState({
      search: e.target.value ? e.target.value.toLowerCase() : ""
    });
  };
  render() {
    if (!this.state.content) {
      return <Loading text="Loading content" />;
    }

    return (
      <div className="home-section">
        {this.state.iOS && (
          <Alert className="m-4 changelog">
            This content is not compatible with iOS
          </Alert>
        )}
        <div className="search-zone mb-4">
          <input placeholder="Search..." onChange={this.onSearch} />
        </div>
        {/*
        {!this.props.avoidSeries && (
          <div>
            <h3 className="default-title">Series</h3>
            <div className="row align-items-center">
              {this.state.content.filter(e => e.type === "tv_shows").map(e => (
                <div className="col media-content" key={e.id}>
                  <MediaCard
                    {...e}
                    thumbnail={e.images.artwork}
                    name={e.title}
                    type="rakuten/serie"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        */}
        {!this.props.avoidMovies && (
          <div>
            <h3 className="default-title">Movies</h3>
            <div className="row align-items-center">
              {this.state.content
                .filter(e => e.type === "movies")
                .filter(e => e.title.toLowerCase().includes(this.state.search))
                .map(e => (
                  <div className="col media-content" key={e.id}>
                    <MediaCard
                      {...e}
                      thumbnail={e.images.artwork}
                      large
                      name={e.title}
                      type="rakuten/movie"
                      rakuten
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
