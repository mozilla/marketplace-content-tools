import FluxComponent from 'flummox/component';
import React from 'react';

import Wizard from '../wizard';
import {CategorySelectGroup} from '../categorySelect';


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
             required type="text"/>
      <button type="submit">Submit</button>
    </form>
  }
});


const MetadataStep = React.createClass({
  getInitialState() {
    // Have to manage controlled props. A lot of workaround to allow checked
    // by default.
    return {
      worldwideChecked: true,
      attributionChecked: true
    };
  },
  handleWorldwideChange() {
    this.setState({worldwideChecked: !this.state.worldwideChecked});
  },
  handleAttributionChange() {
    this.setState({attributionChecked: !this.state.attributionChecked});
  },
  render() {
    const worldwideProps = {};
    if (this.state.worldwideChecked) {
      worldwideProps.checked = true;
    }
    const attributionProps = {};
    if (this.state.attributionChecked) {
      attributionProps.checked = true;
    }

    return <div className="submission--metadata">
      <form className="form-block">
        <p>
          This site has successfully been detected as mobile-friendly! Please
          fill in more information about the website below and our Marketplace
          Reviewers will take a look at them promptly. We tried our best to
          fill out some of the information below for you.
        </p>

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
          <label>Categories</label>
          <CategorySelectGroup/>
        </div>

        <div className="form-block--group">
          <label>Is this useful for a worldwide audience?</label>

          <div className="form-block--radio">
            <input id="submission--worldwide-no" name="worldwide"
                   onChange={this.handleWorldwideChange}
                   type="radio">
            </input>
            <label htmlFor="submission--worldwide-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="submission--worldwide-yes" name="worldwide"
                   onChange={this.handleWorldwideChange}
                   type="radio" {...worldwideProps}>
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

        <div className="form-block--group">
          <label>Would you like public credit for submitting this site?</label>

          <div className="form-block--radio">
            <input id="submission--attribution-no" name="attribution"
                   onChange={this.handleAttributionChange}
                   type="radio">
            </input>
            <label htmlFor="submission--attribution-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="submission--attribution-yes" name="attribution"
                   onChange={this.handleAttributionChange}
                   type="radio" {...attributionProps}>
            </input>
            <label htmlFor="submission--attribution-yes">
              Yes
            </label>
          </div>
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
      <h1>Submitting a Website</h1>
      <FluxComponent connectToStores={'submission'}>
        <Wizard steps={steps} goToStep={goToStep}/>
      </FluxComponent>
    </section>
  }
});


export default Submission;
