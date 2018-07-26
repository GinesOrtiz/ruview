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

  componentDidMount = () => {
    axios.get(`/page/${this.props.match.params.id}`).then(e => {
      const seasons = {};

      e.data.container.forEach(ec => {
        seasons[ec.id] = {
          name: ec.attributes.find(eca => eca.key === "name").value,
          id: ec.id,
          items: ec.itemId
            ? ec.itemId.map(eci => e.data.item.find(ecif => eci === ecif.id))
            : []
        };
      });

      this.setState({ seasons, activeSeason: Object.values(seasons)[0].id });
    });
  };

  render() {
    if (!this.state.seasons) {
      return <Loading text="Loading content" />;
    }
    return (
      <div class="row home-section">
        <div class="col col-md-3 col-lg-2">
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
        <div className="col col-md-9 col-lg-10">
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
