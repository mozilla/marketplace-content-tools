import React from 'react';


const ReviewListingHandler = React.createClass({
  render() {
    return <div className="review-listing-wrapper">
      <h1>Reviewer Tools</h1>

      <FluxComponent connectToStores={'websiteSubmission'}>
        <ReviewListing/>
      </FluxComponent>
    </div>
  }
});


const ReviewListing = React.createClass({
  render() {
    <ul className="review-listing">
      {this.props.sites.map(site => {
        return <ReviewListingItem {...site}/>
      })}
    </ul>
  }
});


const ReviewListingItem = React.createClass({
  render() {
    return <li className="review-listing-item">
      <h2>{this.props.name}</h2>
      <p>{this.props.url}</p>
    </li>
  }
});


export default ReviewListingHandler;
