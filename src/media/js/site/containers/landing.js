import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fxaLoginBegin, login} from '../actions/login';
import {LoginButton} from '../components/login';
import {Page} from '../components/page';


export class Landing extends React.Component {
  static propTypes = {
    fxaLoginBegin: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    siteConfig: React.PropTypes.object.isRequired,
  };

  loginHandler = authCode => {
    // Call login, passing in some extra stuff from siteConfig.
    this.props.login(authCode, this.props.siteConfig.authState,
                     this.props.siteConfig.clientId);
  }

  render() {
    const isLoggedOut = !this.props.user || !this.props.user.token;
    return (
      <Page className="landing">
        <div className="landing--header">
          <h2>Personalize your Firefox OS experience with powerful add-ons</h2>
        </div>

        <div className="landing--content">
          <p>
            Firefox OS Add-ons submission is now closed.<br/> Thank you for your support.
          </p>
        </div>

      </Page>
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
    login
  }, dispatch)
)(Landing);
