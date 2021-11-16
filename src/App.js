// App
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
// import { render } from "react-dom";

// Users
import Search from "./components/users/Search";
import UsersList from "./components/users/UsersList";
import UserProfile from "./components/users/UserProfile";

// Layout
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

// Pages
import About from "./components/pages/About";

const REACT_APP_GITHUB_CLIENT_ID = "9f34799077551195b1f1";
const REACT_APP_GITHUB_CLIENT_SECRET =
  "338e53bf38b4d2b191650a44f165a48a4f1ea189";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Make API request for all users
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  const searchUsers = async (text) => {
    // Search user by username
    // Returns an array of user objects that match criteria
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    // Fetch data for a specific user
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    // Fetch repos for a specific user
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const setAlertHandler = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} setAlert={setAlertHandler} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlertHandler}
                  />
                  <UsersList loading={loading} users={users} />
                </>
              )}
            />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <UserProfile
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
