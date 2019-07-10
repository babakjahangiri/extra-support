import React, { Component } from 'react';
import Login from '../Components/Login';
import { Link } from 'react-router-dom';
class Home extends Component {
  state = { loginClicked: false };
  handleLogin = () => {
    this.setState(prevStat => {
      return {
        loginClicked: !prevStat.loginClicked,
      };
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.loginClicked ? <Link to="/categories">Categories</Link> : <Login handleLogin={this.handleLogin} />}
      </div>
    );
  }
}

export default Home;