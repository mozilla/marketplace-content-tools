import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';

import {LoginButton, LogoutButton} from './login';


let Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  userStateGetter(user) {
    return {
      displayName: user.getDisplayName(),
      isLoggedIn: user.isLoggedIn()
    };
  },
  render() {
    return <header>
      <div className="header--wordmark">
        <p className="header--icon"/>
        <h1>Submission Tools</h1>
      </div>
      <nav>
        <li>
          <Router.Link to="submission">Submission Tools</Router.Link>
          <Router.Link to="review-listing">Reviewer Tools</Router.Link>
        </li>
      </nav>
      <FluxComponent connectToStores={{user: this.userStateGetter}}>
        <HeaderLogin isLoggedIn={false}/>
      </FluxComponent>
    </header>
  }
});


let HeaderLogin = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    isLoggedIn: React.PropTypes.bool.isRequired,
  },
  render() {
    if (this.props.isLoggedIn) {
      return <div className="header--login">
        <p>Logged in as {this.props.displayName}</p>
        <FluxComponent>
          <LogoutButton/>
        </FluxComponent>
      </div>
    } else {
      return <div className="header--login">
        <LoginButton signup={true}/>
        <LoginButton/>
      </div>
    }
  }
});


export default Header;
