/*
  Website metadata form.
  Fires props.onChange with {fieldName, val} whenever a field is changed.
  Fires props.onSubmit with form data when form is submitted.
*/
import _ from 'lodash';
import React from 'react';

import CategoryGroupSelect from './categorySelect';
import LikertSelect from './likertSelect';
import RegionSelect from './regionSelect';


const SubmissionMetadataForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    submitter: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      showCategoryRequiredMsg: false,
      showRegionsRequiredMsg: false
    };
  },
  debugFill() {
    // On local dev, clicking on the image will fill out form fields.
    if (process.env.NODE_ENV !== 'production' && this.props.onChange) {
      this.props.onChange({
        categories: ['games'],
        description: 'Experience the magic.',
        keywords: 'legendary, awesome, wazzup',
        name: 'The Kevin Ngo Experience',
        why_relevant: 'Because high-five.',
        works_well: 5
      });
    }
  },
  handleChange(formFieldName, isBool) {
    // Generates a function that handles a field onChange and fire the data
    // off to update store state.
    return val => {
      if (isBool) {
        val = !this.props[formFieldName];
      } else if (val.target) {
        val = val.target.value;
      }

      if (this.props.onChange) {
        this.props.onChange({[formFieldName]: val});
      }
    };
  },
  handleSubmit(e) {
    // Only called once the form is completely validated.
    e.preventDefault();

    if (this.isValid() && this.props.onSubmit) {
      this.props.onSubmit(this.serializeFormData(e.currentTarget));
    }
  },
  serializeFormData() {
    return {
      categories: this.props.categories,
      canonical_url: this.props.canonical_url,
      description: this.props.description,
      detected_icon: this.props.detected_icon,
      keywords: this.props.keywords.split(','),
      name: this.props.name,
      preferred_regions: this.props.preferred_regions,
      public_credit: this.props.public_credit,
      url: this.props.url,
      why_relevant: this.props.why_relevant,
      works_well: this.props.works_well
    };
  },
  isValid() {
    // Handle validation not handled by HTML5. Triggered on button onClick.
    let isValid = true;

    if (!this.props.categories.length) {
      this.setState({showCategoryRequiredMsg: true});
      isValid = false;
    }
    if (!this.props.worldwide && !this.props.preferred_regions.length) {
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
    return <div className="submission--metadata">
      <form className="form-block" onSubmit={this.handleSubmit}>
        {this.props.isEditing ? '' : <p>
          This site has successfully been detected as mobile-friendly! Please
          fill in more information about the website below and our Marketplace
          Reviewers will take a look at them promptly. We tried our best to
          fill out some of the information below for you.
         </p>}

        <div className="form-block--group">
          <label>Name</label>
          <input name="name" onChange={this.handleChange('name')} required
                 type="text" value={this.props.name}/>
        </div>

        <div className="form-block--group"
             style={{display: this.props.isEditing ? 'block': 'none'}}>
          <label>Submitter</label>
          <input disabled={true} name="submitter" value={this.props.submitter}
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label>URL</label>
          <input disabled={true} name="url" value={this.props.url}
                 type="text"/>
        </div>

        {this.props.detected_icon ?
        // Don't show icon if there is none.
        <div className="form-block--group">
          <label>Detected Icon</label>
          <img src={this.props.detected_icon}/>
        </div> : ''}

        <div className="form-block--group">
          <label htmlFor="keywords">Keywords</label>
          <input id="keywords" name="keywords"
                 onChange={this.handleChange('keywords')} required
                 type="text" value={this.props.keywords}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"
                    onChange={this.handleChange('description')}
                    required rows="10" type="text"
                    value={this.props.description}/>
        </div>

        <div className="form-block--group">
          <label>Categories</label>
          <CategoryGroupSelect
             onChange={this.handleChange('categories')}
             showRequiredMsg={this.state.showCategoryRequiredMsg}
             value={this.props.categories || []}/>
        </div>

        <div className="form-block--group">
          <label>Is this useful for a worldwide audience?</label>

          <div className="form-block--radio">
            <input id="worldwide-no" name="worldwide"
                   onChange={this.handleChange('worldwide', true)}
                   type="radio" checked={!this.props.worldwide}>
            </input>
            <label htmlFor="worldwide-no">No</label>
          </div>

          <div className="form-block--radio">
            <input id="worldwide-yes" name="worldwide"
                   onChange={this.handleChange('worldwide', true)}
                   type="radio" checked={this.props.worldwide}>
            </input>
            <label htmlFor="worldwide-yes">Yes</label>

            <div style={{display: this.props.worldwide ? 'none' : 'block'}}>
              <RegionSelect multi={true} name="preferred_regions"
                 onChange={this.handleChange('preferred_regions')}
                 showRequiredMsg={this.state.showRegionsRequiredMsg}
                 value={this.props.preferred_regions || []}/>
            </div>
          </div>
        </div>

        <div className="form-block--group">
          <label>How well does this website work?</label>
          <LikertSelect labels={['Very Poorly', 'Poorly', 'Okay', 'Well',
                                 'Very Well']}
                        name="worksWell"
                        onChange={this.handleChange('works_well')}
                        required value={this.props.works_well}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="why-relevant">
            Why is this site a good addition for the Firefox Marketplace?
          </label>
          <textarea id="why-relevant" name="why_relevant"
                    onChange={this.handleChange('why_relevant')}
                    required rows="10" value={this.props.why_relevant}/>
        </div>

        <div className="form-block--group">
          <label>Would you like public credit for submitting this site?</label>

          <div className="form-block--radio">
            <input id="public-credit-no" name="public_credit"
                   onChange={this.handleChange('public_credit', true)}
                   type="radio" checked={!this.props.public_credit}>
            </input>
            <label htmlFor="public-credit-no">No</label>
          </div>

          <div className="form-block--radio">
            <input id="public-credit-yes" name="public_credit"
                   onChange={this.handleChange('public_credit', true)}
                   type="radio" checked={this.props.public_credit}>
            </input>
            <label htmlFor="public-credit-yes">Yes</label>
          </div>
        </div>

        <button onClick={this.showErrors} type="submit">
          Finish & Submit
        </button>
      </form>

      <img className="site--screenshot" onClick={this.debugFill}
           src={this.props.mobileFriendlyData &&
                this.props.mobileFriendlyData.screenshot}/>
    </div>
  }
});
export default SubmissionMetadataForm;
