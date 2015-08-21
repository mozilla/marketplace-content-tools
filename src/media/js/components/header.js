import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {LoginButton} from './login';


export default class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  render() {
    return <header>
      <div className="header--wordmark">
        <p className="header--icon"/>
        <h1>Submission Tools</h1>
      </div>
      <nav>
        <li>
          <ReverseLink to="submission-landing">Submission Tools</ReverseLink>
          <ReverseLink to="review-landing">Reviewer Tools</ReverseLink>
        </li>
      </nav>

      <HeaderLogin {...this.props}/>
    </header>
  }
}


class HeaderLogin extends React.Component {
  static propTypes = {
    authUrl: React.PropTypes.string,
    displayName: React.PropTypes.string,
    loginBeginHandler: React.PropTypes.func.isRequired,
    loginHandler: React.PropTypes.func.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
  };
  render() {
    if (this.props.isLoggedIn) {
      return <div className="header--login">
        <p>Logged in as {this.props.displayName}</p>
        <button className="logout" onClick={this.props.logoutHandler}>
          Logout
        </button>
      </div>
    } else {
      return <div className="header--login">
        <LoginButton isSignup={true} {...this.props}/>
        <LoginButton {...this.props}/>
      </div>
    }
  }
}
