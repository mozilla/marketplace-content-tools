import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';

import mktConstants from 'marketplace-constants';
import {humanizeCategory} from '../../constants/categories';


const ReviewListingHandler = React.createClass({
  componentDidMount() {
    this.props.flux.getActions('websiteSubmissions').fetch();
  },
  render() {
    const submissionGetter = store => ({
      submissions: store.getAsList()
    });

    return <section>
      <h1>Reviewing Websites</h1>

      <FluxComponent connectToStores={{'websiteSubmissions':
                                       submissionGetter}}>
        <ReviewListing/>
      </FluxComponent>
    </section>
  }
});
export default ReviewListingHandler;


const ReviewListing = React.createClass({
  render() {
    return <ul className="review-listing">
      {this.props.submissions.map(submission =>
                                  (<ReviewListingItem {...submission}/>))}
    </ul>
  }
});


const ReviewListingItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render() {
    return <li className="review-listing-item">
      <div className="review-listing-item-header">
        <img className="review-listing-icon" src={this.props.icon}/>
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
        <Router.Link to="edit-website" params={{id: this.props.id}}>
          <button>Edit</button>
        </Router.Link>
        <button className="button--success">
          Approve
        </button>
      </div>
    </li>
  }
});
