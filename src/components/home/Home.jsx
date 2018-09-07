/* globals ga */

import React from "react";
import { Alert } from "reactstrap";
import axios from "../../services/client";
import Loading from "../common/Loading";
import MediaCard from "../common/mediaCard/MediaCard";
import Icon from "../common/Icon";
import "./home.css";

class Home extends React.Component {
  state = {
    content: null,
    userSeries: null,
    search: ""
  };

  componentWillMount = () => {
    ga("send", "event", "Page", this.props.section || "home");
    this.requestMainContent(this.state.section);
    this.setState({
      userSeries: Object.keys(localStorage)
        .filter(e => e.includes("show"))
        .map(e => parseInt(e.substr(5)))
    });
  };

  requestMainContent = () => {
    axios.get("?s=all").then(e => {
      this.setState({ content: e.data });
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
        <Alert className="m-4 changelog">
          Version 3.0! - Added Rakuten movies at{" "}
          <Icon type="fiber_new" className="pl-2" />
          <small>
            <b> (Most of the content is in Spanish)</b>
          </small>
        </Alert>
        <div className="search-zone mb-4">
          <input placeholder="Search..." onChange={this.onSearch} />
        </div>
        {!this.props.avoidUserSeries &&
          this.state.userSeries && (
            <div>
              <h3 className="default-title">Continue watching</h3>
              <div className="row align-items-center">
                {this.state.content
                  .filter(e => this.state.userSeries.includes(e.id))
                  .map(e => (
                    <div className="col media-content" key={e.id}>
                      <MediaCard {...e} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        {!this.props.avoidSeries && (
          <div>
            <h3 className="default-title">Series</h3>
            <div className="row align-items-center">
              {this.state.content
                .filter(e => e.type === "series")
                .filter(e => e.name.toLowerCase().includes(this.state.search))
                .map(e => (
                  <div className="col media-content" key={e.id}>
                    <MediaCard {...e} />
                  </div>
                ))}
            </div>
          </div>
        )}
        {!this.props.avoidMovies && (
          <div>
            <h3 className="default-title">Movies</h3>
            <div className="row align-items-center">
              {this.state.content
                .filter(e => e.type === "movies")
                .filter(e => e.name.toLowerCase().includes(this.state.search))
                .map(e => (
                  <div className="col media-content" key={e.id}>
                    <MediaCard {...e} />
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
