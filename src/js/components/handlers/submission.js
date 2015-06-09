import FluxComponent from 'flummox/component';
import connectToStores from 'flummox/connect';
import React from 'react';

import Wizard from '../wizard';


const UrlStep = React.createClass({
  onSubmit: (e) => {
    e.preventDefault();
    this.props.flux.getActions('submission').submitUrl(
      e.currentTarget.elements.submissionUrl.value);
    return false;
  },
  render() {
    return <form onSubmit={this.onSubmit}>
      <label htmlFor="submission--url">URL:</label>
      <input id="submission--url" className="submission--url"
             name="submissionUrl" placeholder="Enter a website URL..."
             type="text" required/>
      <button type="submit">Submit</button>
    </form>
  }
});


const CompatStep = connectToStores(React.createClass({
  render() {
    return <form>
      <label>URL:</label>
      <input type="text" value={this.props.url} disabled={true}/>
      <img src={this.props.screenshot}/>
    </form>
  }
}), 'submission');


const MetadataStep = React.createClass({
  render() {
    return <form>
      <p>Under construction</p>
    </form>
  }
});


const Submission = React.createClass({
  render() {
    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <FluxComponent>
                <UrlStep/>
              </FluxComponent>
      },
      {
        title: 'Step 2: Website Compatibility',
        form: <FluxComponent connectToStores={'submission'}>
                <CompatStep/>
              </FluxComponent>
      },
      {
        title: 'Step 3: Website Metadata',
        form: <FluxComponent connectToStores={'submission'}>
                <MetadataStep/>
              </FluxComponent>
      }
    ];

    const submitActions = this.props.flux.getActions('submission');
    const goToStep = i => () => {submitActions.goToStep(i)};

    return <FluxComponent connectToStores={'submission'}>
      <Wizard className="submission" steps={steps}
              goToPrevStep={submitActions && submitActions.goToPrevStep}
              goToNextStep={submitActions && submitActions.goToNextStep}
              goToStep={goToStep}/>
    </FluxComponent>
  }
});


export default Submission;
