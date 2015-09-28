/*
  Container that roadblocks any actions until the user has signed the TOS.
*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signTOS} from '../actions/tos';
import {Page} from '../components/page';
import TOSIframe from '../components/tos';


export default class TOSSignatureContainer extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  static propTypes = {
    user: React.PropTypes.object,
    signTOS: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <Page title="Marketplace Developer Program" className="tos--sign-agreement">
        <p>
          To submit or review Firefox OS Add-ons, you first need to read and
          accept our Developer Agreement:
        </p>
        <TOSIframe/>
        <div className="sign">
          <nav>
            <ul>
              <li><a href="/developers/docs/policies/agreement" target="_blank">Printable Version</a></li>
              <li><a href="https://developer.mozilla.org/docs/Apps/Marketplace_Review" target="_blank">Additional Marketplace Policies</a></li>
            </ul>
          </nav>
          <button disabled={this.props.user.tos.signing}
                  onClick={this.props.signTOS}>
            {this.props.user.tos.signing ? 'Agreeing...' : 'Agree'}
          </button>
        </div>
      </Page>
    );
  }
};


export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({
    signTOS
  }, dispatch)
)(TOSSignatureContainer);
