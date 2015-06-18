import _ from 'lodash';
import React from 'react';

import {CategoryGroupSelect} from './categorySelect';
import RegionSelect from './regionSelect';


const SubmissionMetadataForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    email: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      attributeChecked: true,
      showCategoryRequiredMsg: false,
      showRegionsRequiredMsg: false,
      siteCategory1: '',
      siteCategory2: '',
      siteDescription: '',
      siteDoAttribute: true,
      siteKeywords: '',
      siteName: '',
      siteReason: '',
      siteRegions: '',
      siteWorldwide: true
    };
  },
  debugFill() {
    // On local dev, clicking on the image will fill out form fields.
    if (process.env.NODE_ENV !== 'production') {
      this.setState({
        siteCategory1: 'games',
        siteDescription: 'Experience the magic.',
        siteKeywords: 'legendary, awesome, wazzup',
        siteName: 'The Kevin Ngo Experience',
        siteReason: 'Because high-five.'
      });
    }
  },
  handleSiteCategory1Change(val) {
    this.setState({siteCategory1: val});
  },
  handleSiteCategory2Change(val) {
    this.setState({siteCategory2: val});
  },
  handleSiteWorldwideChange() {
    this.setState({siteWorldwide: !this.state.siteWorldwide});
  },
  handleSiteDoAttributeChange() {
    this.setState({siteDoAttribute: !this.state.siteDoAttribute});
  },
  handleSubmit(e) {
    // Only called once the form is completely validated.
    e.preventDefault();

    if (this.isValid()) {
      this.props.flux.getActions('submission').submitMetadata(
        this.serializeFormData(e.currentTarget));
    }
  },
  serializeFormData() {
    return {
      categories: [this.state.siteCategory1, this.state.siteCategory2],
      description: this.state.siteDescription,
      doAttribute: this.state.siteDoAttribute,
      keywords: this.state.siteKeywords,
      name: this.state.siteName,
      reason: this.state.siteReason,
      regions: this.state.siteRegions,
      submitterEmail: this.props.email,
      url: this.props.url,
      worldwide: this.state.siteWorldwide,
    };
  },
  isValid() {
    // Handle validation not handled by HTML5. Triggered on button onClick.
    let isValid = true;

    if (!this.state.siteCategory1) {
      this.setState({showCategoryRequiredMsg: true});
      isValid = false;
    }
    if (!this.state.siteWorldwide && !this.state.siteRegions) {
      this.setState({showRegionsRequiredMsg: true});
      isValid = false;
    }

    return isValid;
  },
  showErrors() {
    this.isValid();
    return true;
  },
  render() {
    const siteWorldwideProps = {};
    if (this.state.siteWorldwide) {
      siteWorldwideProps.checked = true;
    }
    const siteDoAttributeProps = {};
    if (this.state.attributeChecked) {
      siteDoAttributeProps.checked = true;
    }

    return <div className="submission--metadata">
      <form className="form-block" onSubmit={this.handleSubmit}>
        <p>
          This site has successfully been detected as mobile-friendly! Please
          fill in more information about the website below and our Marketplace
          Reviewers will take a look at them promptly. We tried our best to
          fill out some of the information below for you.
        </p>

        <div className="form-block--group">
          <label>Name</label>
          <input name="siteName" required type="text"
                 valueLink={this.linkState('siteName')}/>
        </div>

        <div className="form-block--group">
          <label>URL</label>
          <input disabled={true} name="siteUrl" value={this.props.url}
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="site--keywords">Keywords</label>
          <input id="site--keywords" name="siteKeywords" required
                 type="text" valueLink={this.linkState('siteKeywords')}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="site--description">Description</label>
          <textarea id="site--description" name="siteDescription"
                    required rows="10" type="text"
                    valueLink={this.linkState('siteDescription')}/>
        </div>

        <div className="form-block--group">
          <label>Categories</label>
          <CategoryGroupSelect
             onChangeCategory1={this.handleSiteCategory1Change}
             onChangeCategory2={this.handleSiteCategory2Change}
             showRequiredMsg={this.state.showCategoryRequiredMsg}
             valueCategory1={this.state.siteCategory1}
             valueCategory2={this.state.siteCategory2}/>
        </div>

        <div className="form-block--group">
          <label>Is this useful for a worldwide audience?</label>

          <div className="form-block--radio">
            <input id="site--worldwide-no" name="siteWorldwide"
                   onChange={this.handleSiteWorldwideChange}
                   type="radio">
            </input>
            <label htmlFor="site--worldwide-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="site--worldwide-yes" name="siteWorldwide"
                   onChange={this.handleSiteWorldwideChange}
                   type="radio" {...siteWorldwideProps}>
            </input>
            <label htmlFor="site--worldwide-yes">
              Yes
            </label>

            <div style={{display: this.state.siteWorldwide ?
                                  'none' : 'block'}}>
              <RegionSelect multi={true} name="siteRegions"
                 showRequiredMsg={this.state.showRegionsRequiredMsg}/>
            </div>
          </div>
        </div>

        <div className="form-block--group">
          <label htmlFor="site--reason">
            Why is this site a good addition for the Firefox Marketplace?
          </label>
          <textarea id="site--reason" name="siteReason" required
                    rows="10" valueLink={this.linkState('siteReason')}/>
        </div>

        <div className="form-block--group">
          <label>Would you like public credit for submitting this site?</label>

          <div className="form-block--radio">
            <input id="site--do-attribute-no" name="siteDoAttribute"
                   onChange={this.handleSiteDoAttributeChange}
                   type="radio">
            </input>
            <label htmlFor="site--do-attribute-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="site--do-attribute-yes" name="siteDoAttribute"
                   onChange={this.handleSiteDoAttributeChange}
                   type="radio" {...siteDoAttributeProps}>
            </input>
            <label htmlFor="site--do-attribute-yes">
              Yes
            </label>
          </div>
        </div>

        <button onClick={this.showErrors} type="submit">
          Finish & Submit
        </button>
      </form>

      <img className="site--screenshot"
           onClick={this.debugFill}
           src={this.props.mobileFriendlyData &&
                this.props.mobileFriendlyData.screenshot}/>
    </div>
  }
});
export default SubmissionMetadataForm;
