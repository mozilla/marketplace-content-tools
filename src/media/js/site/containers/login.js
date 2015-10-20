import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fxaLoginBegin, login} from '../actions/login';
import {LoginButton} from '../components/login';
import {Page} from '../components/page';


export class Login extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    authUrl: React.PropTypes.string,
    fxaLoginBegin: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
  };
  loginHandler = authCode => {
    // Call login, passing in some extra stuff from siteConfig.
    this.props.login(authCode, this.props.siteConfig.authState,
                     this.props.siteConfig.clientId);
  }
  render() {
    return (
      <Page className="login-form">
        <p>First, would you mind logging in?</p>
        <LoginButton authUrl={this.props.siteConfig.authUrl}
                     loginBeginHandler={this.props.fxaLoginBegin}
                     loginHandler={this.loginHandler}/>
      </Page>
    );
  }
}


export default connect(
  state => ({
    siteConfig: state.siteConfig,
  }),
  dispatch => bindActionCreators({
    fxaLoginBegin,
    login
  }, dispatch)
)(Login);
