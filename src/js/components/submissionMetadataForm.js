import React from 'react';

import {CategorySelectGroup} from './categorySelect';


const SubmissionMetadataForm = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getInitialState() {
    // Have to manage controlled props. A lot of workaround to allow checked
    // by default.
    return {
      worldwideChecked: true,
      attributionChecked: true
    };
  },
  debugFill() {
    // On local dev, clicking on the image will fill out form fields.
    if (process.env.NODE_ENV !== 'production') {
      const form = React.findDOMNode(this.refs.form);
      form.elements.siteName.value = 'The Kevin Ngo Experience';
      form.elements.siteKeywords.value = 'legendary, awesome, wazzup';
      form.elements.siteDescription.value = 'Experience the magic.';
      form.elements.category1.value = 'games';
      form.elements.siteReason.value = 'Because high-five.';
    }
  },
  handleWorldwideChange() {
    this.setState({worldwideChecked: !this.state.worldwideChecked});
  },
  handleAttributionChange() {
    this.setState({attributionChecked: !this.state.attributionChecked});
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.flux.getActions('submission').submitMetadata(
      this.serializeFormData(e.currentTarget));
  },
  serializeFormData(form) {
    return {
      url: form.elements.siteUrl.value
    };
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
      <form className="form-block" onSubmit={this.handleSubmit} ref="form">
        <p>
          This site has successfully been detected as mobile-friendly! Please
          fill in more information about the website below and our Marketplace
          Reviewers will take a look at them promptly. We tried our best to
          fill out some of the information below for you.
        </p>

        <div className="form-block--group">
          <label>Name</label>
          <input name="siteName" required type="text"/>
        </div>

        <div className="form-block--group">
          <label>URL</label>
          <input disabled={true} name="siteUrl" value={this.props.url}
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--keywords">Keywords</label>
          <input id="submission--keywords" name="siteKeywords" required
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--description">Description</label>
          <textarea id="submission--description" name="siteDescription"
                    required rows="10" type="text"/>
        </div>

        <div className="form-block--group">
          <label>Categories</label>
          <CategorySelectGroup/>
        </div>

        <div className="form-block--group">
          <label>Is this useful for a worldwide audience?</label>

          <div className="form-block--radio">
            <input id="submission--worldwide-no" name="siteWorldwide"
                   onChange={this.handleWorldwideChange}
                   type="radio">
            </input>
            <label htmlFor="submission--worldwide-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="submission--worldwide-yes" name="siteWorldwide"
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
          <textarea id="submission--reason" name="siteReason" required
                    rows="10"/>
        </div>

        <div className="form-block--group">
          <label>Would you like public credit for submitting this site?</label>

          <div className="form-block--radio">
            <input id="submission--attribution-no" name="siteAttribute"
                   onChange={this.handleAttributionChange}
                   type="radio">
            </input>
            <label htmlFor="submission--attribution-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="submission--attribution-yes" name="siteAttribute"
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
           onClick={this.debugFill}
           src={this.props.mobileFriendlyData &&
                this.props.mobileFriendlyData.screenshot}/>
    </div>
  }
});
export default SubmissionMetadataForm;
