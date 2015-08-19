import mktConstants from 'marketplace-constants';
import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch as websiteFetch} from '../../actions/websiteSubmissions';
import websiteSubmissionsSelector from '../../selectors/websiteSubmissions';
import {humanizeCategory} from '../../constants/categories';


export class ReviewListingHandler extends React.Component {
  constructor(props) {
    super(props);

    this.props.websiteFetch();
  }
  render() {
    return <section>
      <h1>Reviewing Websites</h1>
      <ReviewListing submissions={this.props.websiteSubmissions}/>
    </section>
  }
};


export default connect(
  websiteSubmissionsSelector,
  dispatch => bindActionCreators({
    websiteFetch
  }, dispatch)
)(ReviewListingHandler);


const ReviewListing = React.createClass({
  render() {
    return <ul className="review-listing">
      {this.props.submissions.map(submission =>
                                  (<ReviewListingItem {...submission}/>))}
      {this.props.submissions.length === 0 ?
      <p>No submissions to review.</p> :
      ''}
    </ul>
  }
});


const ReviewListingItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  approve() {
    alert('Sorry, the development of reviewer tools have been paused. ' +
          'Approving websites has not yet been implemented.');
  },
  render() {
    return <li className="review-listing-item">
      <div className="review-listing-item-header">
        <img className="review-listing-icon" src={this.props.detected_icon}/>
        <h2>{this.props.name}</h2>
      </div>
      <dl className="review-listing-details">
        <dd>URL</dd>
        <dt><a href={this.props.url}>{this.props.url}</a></dt>

        <dd>Submitter</dd>
        <dt>{this.props.submitter}</dt>

        <dd>Why is this site a good addition?</dd>
        <dt>{this.props.why_relevant}</dt>

        <dd>Which regions is this site a good addition?</dd>
        {this.props.preferred_regions.length ?
         this.props.preferred_regions.map(region =>
           <dt>{mktConstants.regions.REGION_CHOICES_SLUG[region]}</dt>) :
         <dt>Worldwide</dt>}

        <dd>Description</dd>
        <dt>{this.props.description}</dt>

        <dd>Categories</dd>
        {this.props.categories.map(cat => <dt>{humanizeCategory(cat)}</dt>)}

        <dd>Keywords</dd>
        <dt>{this.props.keywords.map(kw => <dt>{kw}</dt>)}</dt>

        <dd>How well does this website work?</dd>
        <dt>{this.props.works_well}/5</dt>
      </dl>
      <div className="review-listing-actions">
        <ReverseLink to="edit-website" params={{id: this.props.id}}>
          <button>Edit</button>
        </ReverseLink>
        <button className="button--success" onClick={this.approve}>
          Approve
        </button>
      </div>
    </li>
  }
});
