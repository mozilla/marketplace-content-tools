/*
  Container that allows users who have signed the terms of service to review
  its contents.
*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTOS, signTOS} from '../actions/tos';
import {Page} from '../components/page';
import TOSIframe from '../components/tos';


export class DeveloperAgreement extends React.Component {
  static propTypes = {
    getTOS: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.getTOS();
  }

  renderTOS() {
    if (this.props.user.tos.url) {
      return <TOSIframe url={this.props.user.tos.url}/>;
    }
    return (
      <div className="tos tos--loading">Loading&hellip;</div>
    );
  }

  render() {
    return (
      <Page title="Marketplace Developer Agreement">
        {this.renderTOS()}
      </Page>
    );
  }
};


export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({
    getTOS,
    signTOS,
  }, dispatch)
)(DeveloperAgreement);
