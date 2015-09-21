import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import urlJoin from 'url-join';

import {signTOS} from '../actions/tos';


export default class TOSSignatureHandler extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  static propTypes = {
    user: React.PropTypes.object,
    signTOS: React.PropTypes.func.isRequired,
  };

  render() {
    const tosUrl = urlJoin(process.env.MKT_ROOT, 'developers/terms/standalone');
    return (
      <section class="form form--tos">
        <h1>Marketplace Developer Program</h1>
        <p>
          First, you will need to join the Marketplace Developer Program. To
          begin, please read and accept our Developer Agreement:
        </p>
        <iframe src={tosUrl} width="500" height="300"></iframe>
        <nav>
          <ul>
            <li><a href="/developers/docs/policies/agreement">Printable Version</a></li>
            <li><a href="https://developer.mozilla.org/docs/Apps/Marketplace_Review">Additional Marketplace Policies</a></li>
          </ul>
        </nav>
        <button disabled={this.props.user.tos.signing}
                onClick={this.props.signTOS}>
          {this.props.user.tos.signing ? 'Agreeing...' : 'Agree'}
        </button>
      </section>
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
)(TOSSignatureHandler);
