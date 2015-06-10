import FluxComponent from 'flummox/component';
import React from 'react';

import Wizard from '../wizard';


const UrlStep = React.createClass({
  renderMobileFriendlyError() {
    if (this.props.url && !this.props.mobileFriendlyData.isMobileFriendly) {
      return <div className="form-inline-error">
        <p>
          Sorry, this site was not detected as mobile-friendly. Please enter
          another site.
        </p>
      </div>
    }
  },
  render() {
    const flux = this.props.flux;
    const onSubmit = e => {
      e.preventDefault();
      flux.getActions('submission').submitUrl(
        e.currentTarget.elements.submissionUrl.value);
    };

    return <form className="form-inline submission--url-form"
                 onSubmit={onSubmit}>
      <label htmlFor="submission--url">URL:</label>
      <input id="submission--url" className="submission--url"
             name="submissionUrl" placeholder="Enter a website URL..."
             requiredj type="text" value={this.props.url}/>
      <button type="submit">Submit</button>
    </form>
  }
});


const MetadataStep = React.createClass({
  render() {
    return <div className="submission--metadata">
      <form className="form-block">
        <div className="form-block--group">
          <label>Name</label>
          <input name="name" required type="text"/>
        </div>

        <div className="form-block--group">
          <label>URL</label>
          <input type="text" value={this.props.url} disabled={true}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--keywords">Keywords</label>
          <input id="submission--keywords" name="keywords" required
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--description">Description</label>
          <textarea id="submission--description" name="description"
                    required rows="10" type="text"/>
        </div>

        <div className="form-block--group">
          <label>
            Is this useful for a worldwide audience?
          </label>

          <div className="form-block--radio">
            <input id="submission--worldwide-no" name="worldwide"
                   type="radio">
            </input>
            <label htmlFor="submission--worldwide-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="submission--worldwide-yes" name="worldwide"
                   type="radio">
            </input>
            <label htmlFor="submission--worldwide-yes">
              Yes
            </label>
          </div>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--reason">
            Why is this site a good addition for the Firefox Marketplace?
          </label>
          <textarea id="submission--reason" name="reason" required rows="10"/>
        </div>

        <button type="submit">Finish & Submit</button>
      </form>

      <img className="submission--screenshot"
           src={this.props.mobileFriendlyData &&
                this.props.mobileFriendlyData.screenshot}/>
    </div>
  }
});


const Submission = React.createClass({
  render() {
    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <FluxComponent connectToStores={'submission'}>
                <UrlStep/>
              </FluxComponent>
      },
      {
        title: 'Step 2: Website Metadata',
        form: <FluxComponent connectToStores={'submission'}>
                <MetadataStep/>
              </FluxComponent>
      }
    ];

    const submitActions = this.props.flux.getActions('submission');
    const goToStep = i => () => {submitActions.goToStep(i)};

    return <section className="submission">
      <FluxComponent connectToStores={'submission'}>
        <Wizard steps={steps} goToStep={goToStep}/>
      </FluxComponent>
    </section>
  }
});


export default Submission;
