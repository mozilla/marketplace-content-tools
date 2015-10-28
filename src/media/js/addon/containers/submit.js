import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {messageChange, submit} from '../actions/submit';
import AddonSubnav from '../components/subnav';
import AddonUpload from '../components/upload';
import {Page} from '../../site/components/page';


export class AddonSubmit extends React.Component {
  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    messageChange: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
    user: React.PropTypes.object,
    validationError: React.PropTypes.any,
  };

  render() {
    return (
      <Page className="addon-submit"
            subnav={<AddonSubnav user={this.props.user}/>}
            title="Submit a Firefox OS Add-on">
        <AddonUpload {...this.props}/>
      </Page>
    );
  }
}


export default connect(
  state => ({...state.addonSubmit}),
  dispatch => bindActionCreators({
    messageChange,
    submit,
  }, dispatch)
)(AddonSubmit);
