import {bindActionCreators} from 'redux';
import React from 'react';
import {connect} from 'react-redux';

import Footer from './footer';
import Header from './header';
import {fxaLoginBegin, login, loginOk, logout} from '../actions/login';
import {fetch as siteConfigFetch} from '../actions/siteConfig';


export class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    fxaLoginBegin: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    loginOk: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    siteConfig: React.PropTypes.object.isRequired,
    siteConfigFetch: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);

    // Initial app data fetching.
    this.props.siteConfigFetch();

    // Check if the user is already logged in.
    if (this.props.user.token) {
      this.props.loginOk(this.props.user);
    }
  }
  loginHandler = authCode => {
    // Call login, passing in some extra stuff from siteConfig.
    this.props.login(authCode, this.props.siteConfig.authState,
                     this.props.siteConfig.clientId);
  }
  render() {
    return (
      <div className="app">
        <Header authUrl={this.props.siteConfig.authUrl}
                displayName={this.props.user.settings.display_name}
                loginBeginHandler={this.props.fxaLoginBegin}
                loginHandler={this.loginHandler}
                logoutHandler={this.props.logout}
                isLoggedIn={!!this.props.user.token}/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}


export default connect(
  state => ({
    siteConfig: state.siteConfig,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    fxaLoginBegin,
    login,
    loginOk,
    logout,
    siteConfigFetch
  }, dispatch)
)(App);
