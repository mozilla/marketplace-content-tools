import _ from 'lodash';
import {bindActionCreators} from 'redux';
import React from 'react';
import {connect} from 'react-redux';

import {checkSession, fxaLoginBegin, login, loginOk,
        logout} from '../actions/login';
import {fetch as siteConfigFetch} from '../actions/siteConfig';
import Footer from '../components/footer';
import Notification from '../components/notification';
import Header from '../components/header';
import {initialState as siteConfigInitialState} from '../reducers/siteConfig';
import {initialState as userInitialState} from '../reducers/user';


export class App extends React.Component {
  static propTypes = {
    checkSession: React.PropTypes.func.isRequired,
    children: React.PropTypes.object.isRequired,
    fxaLoginBegin: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    loginOk: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    notification: React.PropTypes.any,
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

    this.props.checkSession();

    // Check if the user is already logged in.
    if (this.props.user.token) {
      let user = _.cloneDeep(this.props.user);
      delete user.hasSession;
      this.props.loginOk(user);
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

        <Notification notification={this.props.notification}/>
      </div>
    );
  }
}


export default connect(
  state => ({
    notification: state.notification.notification,
    siteConfig: state.siteConfig,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    checkSession,
    fxaLoginBegin,
    login,
    loginOk,
    logout,
    siteConfigFetch,
  }, dispatch)
)(App);
