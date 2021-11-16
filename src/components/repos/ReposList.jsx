import React from "react";
import Repo from "./Repo";
import PropTypes from "prop-types";

const ReposList = ({ repos }) => {
  return repos.map((repo) => <Repo repo={repo} key={repo.id} />);
};

ReposList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default ReposList;
