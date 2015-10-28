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
    signTOS: React.PropTypes.func.isRequired,
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
          <p>
            <a href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS/Add-ons/Getting_started"
               target="_blank">
              Learn how to make a Firefox OS add-on &rsaquo;
            </a>
          </p>
        </div>

        <div className="landing--content">
          <section className="landing--submit">
            <p>Submit a new add-on or manage your current add-ons:</p>
            <ReverseLink className="button" to="addon-submit">
              Submit a Firefox OS Add-On &rsaquo;
            </ReverseLink>
          </section>
          {isLoggedOut &&
            <section className="landing--register">
              <p>Don't have an account?</p>
              <LoginButton authUrl={this.props.siteConfig.authUrl}
                           content="Create One Now &rsaquo;"
                           loginBeginHandler={this.props.fxaLoginBegin}
                           loginHandler={this.loginHandler}
                           isSignup={true}/>
            </section>
          }
        </div>

        <div className="landing--content landing--community">
          <p>Join the Community</p>
          <ul>
            <li><a href="https://blog.mozilla.org/addons/" target="_blank">Blog</a></li>
            <li><a href="https://discourse.mozilla-community.org/c/add-ons" target="_blank">Discussion forum</a></li>
            <li><a href="https://mail.mozilla.org/listinfo/dev-addons" target="_blank">Mailing list</a></li>
            <li><a href="https://wiki.mozilla.org/Add-ons/Contribute" target="_blank">Learn more</a></li>
          </ul>
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
