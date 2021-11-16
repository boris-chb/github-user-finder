import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const { title, icon } = props;
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
