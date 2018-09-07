/* globals ga */

import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { tabs, defaultTab } from "./config";
import Loading from "../common/Loading";
import { outtvClient as axios } from "../../services/client";
import MediaCard from "../common/mediaCard/MediaCard";
import history from "../../store/history";
import "./home.css";

class Home extends React.Component {
  state = {
    activeTab: tabs[defaultTab].id,
    tabs: {},
    search: ""
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab.id) {
      this.setState({
        activeTab: tab.id
      });
      history.push(`/outtv/${tab.id}`);
    }
    if (!this.state.tabs[tab.id]) {
      this.loadTabContent(tab);
    }
  }

  loadTabContent(tab) {
    axios.get(`/page/${tab.pageId}`).then(e => {
      this.setState({ tabs: { ...this.state.tabs, [tab.id]: e.data } });
    });
  }

  getProperty(content, key) {
    const element = content.attributes.find(e => e.key === key);
    return element ? element.value : null;
  }

  componentWillMount = () => {
    ga("send", "event", "OuttvPage", this.props.section || "home");
    let currentTab = tabs[defaultTab];

    if (this.props.match.params.tab) {
      currentTab = tabs.find(e => e.id === this.props.match.params.tab);
      this.setState({ activeTab: currentTab.id });
    }

    this.loadTabContent(currentTab);
  };

  onSearch = e => {
    this.setState({
      search: e.target.value ? e.target.value.toLowerCase() : ""
    });
  };

  render() {
    return (
      <div className="home-section">
        <Nav tabs>
          {tabs.map(tab => (
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === tab.id
                })}
                onClick={() => this.toggleTab(tab)}
              >
                {tab.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <div className="search-zone mb-4">
          <input placeholder="Search..." onChange={this.onSearch} />
        </div>
        <TabContent activeTab={this.state.activeTab}>
          {tabs.map(tab => (
            <TabPane tabId={tab.id}>
              {this.state.tabs[tab.id] ? (
                <div
                  className="row align-items-center"
                  key={`tabPane-${tab.id}`}
                >
                  {this.state.tabs[tab.id].item
                    .filter(e =>
                      this.getProperty(e, "name")
                        .replace("Navigation to ", "")
                        .toLowerCase()
                        .includes(this.state.search)
                    )
                    .map(e => (
                      <div className="col media-content" key={e.id}>
                        <MediaCard
                          outtv
                          type={
                            this.getProperty(e, "assetId")
                              ? "outtv/video"
                              : "outtv/serie"
                          }
                          id={
                            this.getProperty(e, "pageId")
                              ? this.getProperty(e, "pageId")
                              : e.id
                          }
                          name={this.getProperty(e, "name").replace(
                            "Navigation to ",
                            ""
                          )}
                          thumbnail={`http://ca.misly.es/img.php?c=${e.id}`}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <Loading text="Loading content" />
              )}
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}

export default Home;
