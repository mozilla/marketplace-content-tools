import React from 'react';
import {reverse} from 'react-router-reverse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {submit} from '../actions/submit';
import AddonSubnav from '../components/addonSubnav';
import AddonUpload from '../components/upload';
import PageHeader from '../../site/components/pageHeader';


export class AddonSubmit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
    validationErrorMessage: React.PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    // TODO: once we move to React 0.14, dispatch redux-react-router's
    // transitionTo in add-on submission actions instead. Doesn't work in 0.13.

    // Redirect to dashboard once submission is complete.
    if (this.props.isSubmitting && !nextProps.isSubmitting &&
        !nextProps.validationErrorMessage) {
      const path = reverse(this.context.router.routes, 'addon-dashboard');
      this.context.router.transitionTo(path);
    }
  }

  render() {
    return (
      <section>
        <AddonSubnav/>
        <PageHeader title="Submitting Firefox OS Add-ons"/>
        <h3>Upload a Firefox OS Add-on</h3>
        <AddonUpload {...this.props}/>
      </section>
    );
  }
}


export default connect(
  state => ({...state.addonSubmit}),
  dispatch => bindActionCreators({
    submit
  }, dispatch)
)(AddonSubmit);
