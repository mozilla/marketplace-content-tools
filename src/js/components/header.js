import FluxComponent from 'flummox/component';
import React from 'react';

import {LoginButton, LogoutButton} from './login';


let Header = React.createClass({
  userStateGetter(user) {
    return {
      displayName: user.getDisplayName(),
      isLoggedIn: user.isLoggedIn()
    };
  },
  render() {
    return <header>
      <p className="header--icon"/>
      <h1>Submission Tools</h1>
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
        <p>{this.props.displayName}</p>
        <FluxComponent>
          <LogoutButton/>
        </FluxComponent>
      </div>
    } else {
      return <div className="header--login">
        <LoginButton/>
        <LoginButton signup={true}/>
      </div>
    }
  }
});


export default Header;
