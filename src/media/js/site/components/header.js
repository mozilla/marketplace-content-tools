import classNames from 'classnames';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {LoginButton} from './login';


export default class Header extends React.Component {
  static propTypes = {
    authUrl: React.PropTypes.string,
    email: React.PropTypes.string,
    loginBeginHandler: React.PropTypes.func.isRequired,
    loginHandler: React.PropTypes.func.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    hasSignedTOS: React.PropTypes.bool,
    isLoggedIn: React.PropTypes.bool.isRequired,
  };

  render() {
    const showNav = this.props.isLoggedIn && this.props.hasSignedTOS;
    return (
      <header className="header" data-header-show-nav={showNav}>
        <h1>
          <a className="header--wordmark" href="/">Firefox Marketplace</a>
          <ReverseLink to="root" className="header--title">
            Content Tools
          </ReverseLink>
        </h1>
        {showNav &&
          <nav className="header--nav">
            <ul>
              <li><ReverseLink to="addon">Firefox OS Add-ons</ReverseLink></li>
              <li>
                <ReverseLink to="dev-agreement">Developer Agreement</ReverseLink>
              </li>
              <li>
                <a href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS/Add-ons/Review_critera"
                   target="_blank">
                  Review Criteria
                </a>
              </li>
              <HeaderUserNavMobile {...this.props}/>
            </ul>
          </nav>
        }
        <HeaderUserNav {...this.props}/>
      </header>
    );
  }
}


class HeaderUserNav extends React.Component {
  static propTypes = {
    authUrl: React.PropTypes.string,
    email: React.PropTypes.string,
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


class HeaderUserNavMobile extends HeaderUserNav {
  renderAnonNav() {
    return (
      <noop className="header-user-nav--mobile">
        <li><LoginButton isSignup={true} {...this.props}/></li>
        <li><LoginButton {...this.props}/></li>
      </noop>
    );
  }

  renderUserNav() {
    return (
      <li className="header-user-nav--mobile"
          onClick={this.handleLogoutClick.bind(this)}>
        <a>Logout from {this.props.email}</a>
      </li>
    );
  }
}
