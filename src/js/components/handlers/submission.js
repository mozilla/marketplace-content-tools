import FluxComponent from 'flummox/component';
import React from 'react';

import Wizard from '../wizard';


const urlStep = {
  title: 'Step 1: Website URL',
  onSubmit: (form, flux) => {
    flux.getActions('submission').analyzeSite(
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


const compatStep = {
  title: 'Step 2: Website Compatibility',
  onSubmit: () => {
  },
  form: <form>
    <p>Under construction</p>
  </form>,
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

    return <FluxComponent connectToStores={'wizard'}>
      <Wizard className="submission" steps={steps}/>
    </FluxComponent>
  }
});


export default Submission;
