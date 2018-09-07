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
        <Link to="/outtv">
          <Icon type="add_to_queue" />
        </Link>
        <Link to="/rakuten">
          <Icon type="fiber_new" />
        </Link>
      </Navbar>
    );
  }
}

export default Header;
