// App
import React, { Fragment, Component } from "react";
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

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // Make API request for all users
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async (text) => {
    // Search user by username
    // Returns an array of user objects that match criteria
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    // Fetch data for a specific user
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ user: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message = null, type = null) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading, alert } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} setAlert={this.setAlert} />

            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    user={user}
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
  }
}

export default App;
