import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WebsiteForm from '../websiteForm';
import WebsiteUrlForm from '../websiteUrlForm';
import Wizard from '../wizard';

import {setFormData, submitMetadata} from '../../actions/submissionWebsite';
import {goToStep, submitUrl} from '../../actions/submissionWebsiteUrl';


export class SubmissionWebsiteHandler extends React.Component {
  static propTypes = {
    goToStep: React.PropTypes.func.isRequired,
    setFormData: React.PropTypes.func.isRequired,
    submissionWebsite: React.PropTypes.object.isRequired,
    submissionWebsiteUrl: React.PropTypes.object.isRequired,
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
                 url={this.props.submissionWebsiteUrl.url}/>
      },
      {
        title: 'Step 2: Website Metadata',
        form: <WebsiteForm
                 onChange={this.props.setFormData}
                 onSubmit={this.props.submitMetadata}
                 screenshot={this.props.submissionWebsiteUrl
                                       .mobileFriendlyData.screenshot}
                 submitter={this.props.submitter}
                 url={this.props.submissionWebsiteUrl.url}
                 {...this.props.submissionWebsite}
              />
      }
    ];
    return <section className="submission">
      <h1>Submitting a Website</h1>
      <Wizard steps={steps} goToStep={this.props.goToStep}
              {...this.props.submissionWebsiteUrl}/>
    </section>
  }
}


export default connect(
  state => ({
    submitter: state.user.settings.email,
    submissionWebsite: state.submissionWebsite,
    submissionWebsiteUrl: state.submissionWebsiteUrl,
  }),
  dispatch => bindActionCreators({
    goToStep,
    setFormData,
    submitMetadata,
    submitUrl,
  }, dispatch)
)(SubmissionWebsiteHandler);
