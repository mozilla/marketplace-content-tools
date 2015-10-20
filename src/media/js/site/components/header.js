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
    const userOk = this.props.isLoggedIn && this.props.hasSignedTOS;
    return (
      <header className="header" data-header-user-ok={userOk}>
        <h1>
          <a className="header-wordmark" href="/">Firefox Marketplace</a>
          <ReverseLink to="root" className="header-title">
            Content Tools
          </ReverseLink>
        </h1>
        {userOk &&
          <nav className="header-nav">
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
              {userOk &&
                <HeaderLogoutMobile {...this.props}/>
              }
            </ul>
          </nav>
        }
        <HeaderUser {...this.props}/>
        {!userOk &&
          <HeaderLoginMobile {...this.props}/>
        }
      </header>
    );
  }
}


class HeaderUser extends React.Component {
  static propTypes = {
    authUrl: React.PropTypes.string,
    email: React.PropTypes.string,
    loginBeginHandler: React.PropTypes.func.isRequired,
    loginHandler: React.PropTypes.func.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
  }

  state = {
    isShowingDropdown: false
  }

  toggleUserDropdown() {
    this.setState({isShowingDropdown: !this.state.isShowingDropdown});
  }

  handleLogoutClick(evt) {
    this.toggleUserDropdown();
    this.props.logoutHandler(evt);
  }

  renderAnonNav() {
    return (
      <div className="header-user">
        <ul>
          <li><LoginButton {...this.props}/></li>
        </ul>
      </div>
    );
  }

  renderUserNav() {
    let dropdownClasses = classNames({
      'header-user': true,
      'header-user--is-showing-dropdown': this.state.isShowingDropdown
    });

    let toggleUserDropdown = this.toggleUserDropdown.bind(this);

    return (
      <div className={dropdownClasses}>
        <button className="header-user-dropdown-toggle"
                onClick={toggleUserDropdown}>
          User
        </button>
        <section className="header-user-dropdown">
          <p>{this.props.email}</p>
          <ul>
            <li>
              <button onClick={this.handleLogoutClick.bind(this)}>
                Logout
              </button>
            </li>
          </ul>
        </section>
      </div>
    );
  }

  render() {
    return this.props.isLoggedIn ? this.renderUserNav() : this.renderAnonNav();
  }
}


class HeaderLoginMobile extends React.Component {
  render() {
    return (
      <div className="header-login--mobile">
        <LoginButton {...this.props}/>
      </div>
    );
  }
}


class HeaderLogoutMobile extends HeaderUser {
  render() {
    return (
      <li className="header-logout--mobile"
          onClick={this.handleLogoutClick.bind(this)}>
        <a>Logout from {this.props.email}</a>
      </li>
    );
  }
}
