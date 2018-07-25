import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import Icon from "./Icon";

class Header extends React.Component {
  state = {};

  render() {
    return (
      <Navbar className="align-content-center align-items-center">
        <Link to="/">
          <Icon type="dashboard" />
        </Link>
        <Link to="/series">
          <Icon type="tv" />
        </Link>
        <Link to="/movies">
          <Icon type="local_movies" />
        </Link>
      </Navbar>
    );
  }
}

export default Header;
