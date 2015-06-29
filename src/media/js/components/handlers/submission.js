import FluxComponent from 'flummox/component';
import React from 'react';

import SubmissionMetadataForm from '../submissionMetadataForm';
import SubmissionUrlForm from '../submissionUrlForm';
import Wizard from '../wizard';


const Submission = React.createClass({
  render() {
    const metadataStoreConnector = {
      submission: null,
      submissionMetadataForm: null,
      user: store => store.getEmail()
    };

    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <FluxComponent connectToStores={'submission'}>
                <SubmissionUrlForm/>
              </FluxComponent>
      },
      {
        title: 'Step 2: Website Metadata',
        form: <FluxComponent connectToStores={metadataStoreConnector}>
                <SubmissionMetadataForm/>
              </FluxComponent>
      }
    ];

    const submitActions = this.props.flux.getActions('submission');
    const goToStep = i => () => {submitActions.goToStep(i)};

    return <section className="submission">
      <h1>Submitting a Website</h1>
      <FluxComponent connectToStores={'submission'}>
        <Wizard steps={steps} goToStep={goToStep}/>
      </FluxComponent>
    </section>
  }
});


export default Submission;
