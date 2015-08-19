import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import SubmissionMetadataForm from '../submissionMetadataForm';
import SubmissionUrlForm from '../submissionUrlForm';
import Wizard from '../wizard';

import {goToStep, submitUrl} from '../../actions/submission';
import {setFormData,
        submitMetadata} from '../../actions/submissionMetadataForm';


class Submission extends React.Component {
  static propTypes = {
    goToStep: React.PropTypes.func.isRequired,
    setFormData: React.PropTypes.func.isRequired,
    submission: React.PropTypes.object.isRequired,
    submissionMetadata: React.PropTypes.object.isRequired,
    submitter: React.PropTypes.string.isRequired,
    submitMetadata: React.PropTypes.func.isRequired,
    submitUrl: React.PropTypes.func.isRequired,
  };
  render() {
    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <SubmissionUrlForm
                 submitHandler={this.props.submitUrl}
                 url={this.props.submission.url}/>
      },
      {
        title: 'Step 2: Website Metadata',
        form: <SubmissionMetadataForm
                 onChange={this.props.setFormData}
                 onSubmit={this.props.submitMetadata}
                 screenshot={this.props.submission.mobileFriendlyData
                                                  .screenshot}
                 submitter={this.props.submitter}
                 url={this.props.submission.url}
                 {...this.props.submissionMetadata}
              />
      }
    ];
    return <section className="submission">
      <h1>Submitting a Website</h1>
      <Wizard steps={steps} goToStep={this.props.goToStep}
              {...this.props.submission}/>
    </section>
  }
}


export default connect(
  state => ({
    submitter: state.user.settings.email,
    submission: state.submission,
    submissionMetadata: state.submissionMetadata,
  }),
  dispatch => bindActionCreators({
    goToStep,
    setFormData,
    submitMetadata,
    submitUrl,
  }, dispatch)
)(Submission);
