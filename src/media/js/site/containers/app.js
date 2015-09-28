import {bindActionCreators} from 'redux';
import React from 'react';
import {connect} from 'react-redux';

import {fxaLoginBegin, login, loginOk, logout} from '../actions/login';
import {fetch as siteConfigFetch} from '../actions/siteConfig';

import Footer from '../components/footer';
import Header from '../components/header';

import {initialState as siteConfigInitialState} from '../reducers/siteConfig';
import {initialState as userInitialState} from '../reducers/user';


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

  static defaultProps = {
    siteConfig: siteConfigInitialState,
    user: userInitialState,
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
    const hasSignedTOS = (this.props.user.tos &&
                          this.props.user.tos.has_signed);
    return (
      <div className="app">
        <Header authUrl={this.props.siteConfig.authUrl}
                email={this.props.user.settings.email}
                hasSignedTOS={hasSignedTOS}
                isLoggedIn={!!this.props.user.token}
                loginBeginHandler={this.props.fxaLoginBegin}
                loginHandler={this.loginHandler}
                logoutHandler={this.props.logout}
                permissions={this.props.user.permissions}/>
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
    ui: state.ui,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    fxaLoginBegin,
    login,
    loginOk,
    logout,
    siteConfigFetch,
  }, dispatch)
)(App);
