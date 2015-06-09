import FluxComponent from 'flummox/component';
import connectToStores from 'flummox/connect';
import React from 'react';

import Wizard from '../wizard';


const urlStep = {
  title: 'Step 1: Website URL',
  onSubmit: (form, flux) => {
    flux.getActions('submission').submitUrl(
      form.elements.submissionUrl.value);
  },
  form: <form>
    <label htmlFor="submission--url">Website URL</label>
    <input id="submission--url" className="submission--url"
           name="submissionUrl" placeholder="Enter a website URL..."
           required/>
    <button type="submit">Submit</button>
  </form>
}


const CompatStepForm = connectToStores(React.createClass({
  render() {
    return <form>
      <label>URL:</label>
      <input type="text" value={this.props.url} disabled={true}/>
    </form>
  }
}), 'submission');


const compatStep = {
  title: 'Step 2: Website Compatibility',
  onSubmit: () => {
  },
  form: <CompatStepForm/>
}


const metadataStep = {
  title: 'Step 3: Website Metadata',
  onSubmit: () => {
  },
  form: <form>
    <p>Under construction</p>
  </form>,
}


const Submission = React.createClass({
  render() {
    const steps = [
      urlStep, compatStep, metadataStep
    ];

    const submitActions = this.props.flux.getActions('submission');
    const goToStep = i => () => {submitActions.goToStep(i)};
    submitActions.setNumSteps(steps.length);

    return <FluxComponent connectToStores={'submission'}>
      <Wizard className="submission" steps={steps}
              goToPrevStep={submitActions.goToPrevStep}
              goToNextStep={submitActions.goToNextStep}
              goToStep={goToStep}/>
    </FluxComponent>
  }
});


export default Submission;
