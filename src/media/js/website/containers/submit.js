import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WebsiteForm from '../components/websiteForm';
import WebsiteUrlForm from '../components/websiteUrlForm';
import Wizard from '../../site/components/wizard';

import {setFormData, submitMetadata} from '../actions/submit';
import {goToStep, submitUrl} from '../actions/submitUrl';


export class WebsiteSubmit extends React.Component {
  static propTypes = {
    goToStep: React.PropTypes.func.isRequired,
    setFormData: React.PropTypes.func.isRequired,
    websiteSubmit: React.PropTypes.object.isRequired,
    websiteSubmitUrl: React.PropTypes.object.isRequired,
    submitter: React.PropTypes.string.isRequired,
    submitMetadata: React.PropTypes.func.isRequired,
    submitUrl: React.PropTypes.func.isRequired,
  };
  render() {
    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <WebsiteUrlForm
                 submitHandler={this.props.submitUrl}
                 url={this.props.websiteSubmitUrl.url}/>
      },
      {
        title: 'Step 2: Website Metadata',
        form: <WebsiteForm
                 onChange={this.props.setFormData}
                 onSubmit={this.props.submitMetadata}
                 screenshot={this.props.websiteSubmitUrl
                                       .mobileFriendlyData.screenshot}
                 submitter={this.props.submitter}
                 url={this.props.websiteSubmitUrl.url}
                 {...this.props.websiteSubmit}
              />
      }
    ];
    return <section>
      <h1>Submitting a Website</h1>
      <Wizard steps={steps} goToStep={this.props.goToStep}
              {...this.props.websiteSubmitUrl}/>
    </section>
  }
}


export default connect(
  state => ({
    submitter: state.user.settings.email,
    websiteSubmit: state.websiteSubmit,
    websiteSubmitUrl: state.websiteSubmitUrl,
  }),
  dispatch => bindActionCreators({
    goToStep,
    setFormData,
    submitMetadata,
    submitUrl,
  }, dispatch)
)(WebsiteSubmit);
