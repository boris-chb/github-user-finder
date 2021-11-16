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
      company,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
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
        <strong>Hireable:</strong>{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        {/* Profile Card */}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>{location}</p>
          </div>
          <div className="all-center">
            {bio && (
              <>
                <h3>
                  <p>{bio}</p>
                </h3>
              </>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              See on GitHub
            </a>
            <ul>
              <li>
                <h3>{login && <>{login}</>}</h3>
              </li>
              <li>{blog && <>{blog}</>}</li>
              <li>{company && <>{company}</>}</li>
            </ul>
          </div>
        </div>
        {/* Badges Card */}
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Repos: {public_repos}</div>
          <div className="badge badge-dark">Gists: {public_gists}</div>
        </div>
      </>
    );
  }
}

export default UserProfile;
