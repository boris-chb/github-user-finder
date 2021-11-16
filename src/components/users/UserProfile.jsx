import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      pulbic_repos,
      public_gists,
      hireable
    } = this.props.user;
    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
      </>
    );
  }
}

export default UserProfile;
