import _ from 'lodash';
import React from 'react';

import {CategoryGroupSelect} from './categorySelect';
import LikertSelect from './likertSelect';
import RegionSelect from './regionSelect';


const SubmissionMetadataForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    email: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      category1: '',
      category2: '',
      description: '',
      keywords: '',
      name: '',
      preferred_regions: [],
      public_credit: true,
      showCategoryRequiredMsg: false,
      showRegionsRequiredMsg: false,
      why_relevant: '',
      worldwide: true,
      works_well: ''
    };
  },
  debugFill() {
    // On local dev, clicking on the image will fill out form fields.
    if (process.env.NODE_ENV !== 'production') {
      this.setState({
        category1: 'games',
        description: 'Experience the magic.',
        keywords: 'legendary, awesome, wazzup',
        name: 'The Kevin Ngo Experience',
        why_relevant: 'Because high-five.',
        works_well: 5
      });
    }
  },
  handlePublicCreditChange() {
    this.setState({public_credit: !this.state.public_credit});
  },
  handleCategory1Change(val) {
    this.setState({category1: val});
  },
  handleCategory2Change(val) {
    this.setState({category2: val});
  },
  handlePreferredRegionsChange(val) {
    this.setState({preferred_regions: val.split(',')});
  },
  handleWorldwideChange() {
    this.setState({worldwide: !this.state.worldwide});
  },
  handleWorksWellChange(val) {
    this.setState({works_well: val});
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
      categories: [this.state.category1, this.state.category2],
      description: this.state.description,
      keywords: this.state.keywords,
      name: this.state.name,
      preferred_regions: this.state.preferred_regions,
      public_credit: this.state.public_credit,
      submitter: this.props.email,
      url: this.props.url,
      why_relevant: this.state.why_relevant,
      works_well: this.state.works_well
    };
  },
  isValid() {
    // Handle validation not handled by HTML5. Triggered on button onClick.
    let isValid = true;

    if (!this.state.category1) {
      this.setState({showCategoryRequiredMsg: true});
      isValid = false;
    }
    if (!this.state.worldwide && !this.state.preferred_regions.length) {
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
    const worldwideProps = {};
    if (this.state.worldwide) {
      worldwideProps.checked = true;
    }
    const publicCreditProps = {};
    if (this.state.public_credit) {
      publicCreditProps.checked = true;
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
          <input name="name" required type="text"
                 valueLink={this.linkState('name')}/>
        </div>

        <div className="form-block--group">
          <label>URL</label>
          <input disabled={true} name="url" value={this.props.url}
                 type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="keywords">Keywords</label>
          <input id="keywords" name="keywords" required
                 type="text" valueLink={this.linkState('keywords')}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"
                    required rows="10" type="text"
                    valueLink={this.linkState('description')}/>
        </div>

        <div className="form-block--group">
          <label>Categories</label>
          <CategoryGroupSelect
             onChangeCategory1={this.handleCategory1Change}
             onChangeCategory2={this.handleCategory2Change}
             showRequiredMsg={this.state.showCategoryRequiredMsg}
             valueCategory1={this.state.category1}
             valueCategory2={this.state.category2}/>
        </div>

        <div className="form-block--group">
          <label>Is this useful for a worldwide audience?</label>

          <div className="form-block--radio">
            <input id="worldwide-no" name="worldwide"
                   onChange={this.handleWorldwideChange}
                   type="radio">
            </input>
            <label htmlFor="worldwide-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="worldwide-yes" name="worldwide"
                   onChange={this.handleWorldwideChange}
                   type="radio" {...worldwideProps}>
            </input>
            <label htmlFor="worldwide-yes">
              Yes
            </label>

            <div style={{display: this.state.worldwide ? 'none' : 'block'}}>
              <RegionSelect multi={true} name="preferred_regions"
                 onChange={this.handlePreferredRegionsChange}
                 showRequiredMsg={this.state.showRegionsRequiredMsg}
                 value={this.state.preferred_regions}/>
            </div>
          </div>
        </div>

        <div className="form-block--group">
          <label>How well does this website work?</label>
          <LikertSelect labels={['Very Poorly', 'Poorly', 'Okay', 'Well',
                                 'Very Well']}
                        name="worksWell"
                        onChange={this.handleWorksWellChange}
                        required value={this.state.works_well}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="why-relevant">
            Why is this site a good addition for the Firefox Marketplace?
          </label>
          <textarea id="why-relevant" name="why_relevant" required
                    rows="10" valueLink={this.linkState('why_relevant')}/>
        </div>

        <div className="form-block--group">
          <label>Would you like public credit for submitting this site?</label>

          <div className="form-block--radio">
            <input id="public-credit-no" name="public_credit"
                   onChange={this.handlePublicCreditChange}
                   type="radio">
            </input>
            <label htmlFor="public-credit-no">
              No
            </label>
          </div>

          <div className="form-block--radio">
            <input id="public-credit-yes" name="public_credit"
                   onChange={this.handlePublicCreditChange}
                   type="radio" {...publicCreditProps}>
            </input>
            <label htmlFor="public-credit-yes">
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
