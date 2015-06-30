import FluxComponent from 'flummox/component';
import React from 'react';


const ReviewListingHandler = React.createClass({
  componentDidMount() {
    this.props.flux.getActions('websiteSubmissions').fetch();
  },
  render() {
    const submissionGetter = store => ({
      submissions: store.getAsList()
    });

    return <div className="review-listing-wrapper">
      <h1>Reviewer Tools</h1>

      <FluxComponent connectToStores={{'websiteSubmissions': submissionGetter}}>
        <ReviewListing/>
      </FluxComponent>
    </div>
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
  render() {
    return <li className="review-listing-item">
      <h2>{this.props.name}</h2>
      <p><a href={this.props.url}>{this.props.url}</a></p>
      <div className="review-listing-actions">
        <button>
          <a>Edit</a>
        </button>
        <button className="button--success">
          <a>Approve</a>
        </button>
      </div>
    </li>
  }
});
