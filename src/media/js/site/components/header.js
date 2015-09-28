import classNames from 'classnames';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {LoginButton} from './login';


export default class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const showNav = this.props.isLoggedIn && this.props.hasSignedTOS;
    return (
      <header className="header">
        <h1>
          <a className="header--wordmark" href="/">Firefox Marketplace</a>
          <ReverseLink to="root" className="header--title">
            Content Tools
          </ReverseLink>
        </h1>
        {showNav && <nav className="header--nav">
          <ul>
            <li><ReverseLink to="addon">Firefox OS Add-ons</ReverseLink></li>
            <li><ReverseLink to="dev-agreement">Developer Agreement</ReverseLink></li>
          </ul>
        </nav>}
        <HeaderUserNav {...this.props}/>
      </header>
    );
  }
}


class HeaderUserNav extends React.Component {
  static propTypes = {
    authUrl: React.PropTypes.string,
    displayName: React.PropTypes.string,
    loginBeginHandler: React.PropTypes.func.isRequired,
    loginHandler: React.PropTypes.func.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
  }

  state = {
    isShowingUserDropdown: false
  }

  toggleUserDropdown() {
    this.setState({isShowingUserDropdown: !this.state.isShowingUserDropdown});
  }

  handleLogoutClick(evt) {
    this.toggleUserDropdown();
    this.props.logoutHandler(evt);
  }

  renderAnonNav() {
    return (
      <nav className="header--nav">
        <ul>
          <li><LoginButton isSignup={true} {...this.props}/></li>
          <li><LoginButton {...this.props}/></li>
        </ul>
      </nav>
    );
  }

  renderUserNav() {
    let dropdownClasses = classNames({
      'header--nav': true,
      'header--nav--showing-user-dropdown': this.state.isShowingUserDropdown
    });

    let toggleUserDropdown = this.toggleUserDropdown.bind(this);

    return (
      <nav className={dropdownClasses}>
        <button className="header--nav--user"
                onClick={toggleUserDropdown}>
          User
        </button>
        <section className="header--nav--user-dropdown">
          <p>{this.props.email}</p>
          <ul>
            <li>
              <button onClick={this.handleLogoutClick.bind(this)}>
                Logout
              </button>
            </li>
          </ul>
        </section>
      </nav>
    );
  }

  render() {
    return this.props.isLoggedIn ? this.renderUserNav() : this.renderAnonNav();
  }
}
