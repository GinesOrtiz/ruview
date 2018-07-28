import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { outtvClient as axios } from "../../services/client";
import MediaCard from "../common/mediaCard/MediaCard";
import Loading from "../common/Loading";
import "./home.css";

class Serie extends React.Component {
  state = {
    seasons: null,
    activeSeason: 0
  };

  changeSeason = id => {
    this.setState({ activeSeason: id });
  };

  getProperty(content, key) {
    const element = content.attributes.find(e => e.key === key);
    return element ? element.value : null;
  }

  compare(a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }

  componentDidMount = () => {
    axios.get(`/page/${this.props.match.params.id}`).then(e => {
      const seasons = {};

      e.data.container.sort(this.compare).forEach(ec => {
        seasons[ec.id] = {
          name: ec.attributes.find(eca => eca.key === "name").value,
          id: ec.id,
          items: ec.itemId
            ? ec.itemId.map(eci => e.data.item.find(ecif => eci === ecif.id))
            : []
        };
      });

      this.setState({
        name: e.data.page.title,
        seasons,
        activeSeason: Object.values(seasons)[0].id
      });
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
                {e.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div className="col col-md-9 col-lg-10 p-3">
          <div className="row align-items-center">
            {this.state.seasons[this.state.activeSeason].items.map(e => (
              <div className="col media-content" key={e.id}>
                <MediaCard
                  outtv
                  type="outtv/video"
                  id={e.id}
                  name={this.getProperty(e, "title")}
                  thumbnail={this.getProperty(e, "image-background")}
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
