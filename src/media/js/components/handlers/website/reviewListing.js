import mktConstants from 'marketplace-constants';
import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch as websiteFetch} from '../../../actions/reviewWebsiteListing';
import reviewWebsiteListingSelector from '../../../selectors/reviewWebsiteListing';
import {humanizeCategory} from '../../../constants/categories';


export class WebsiteReviewListing extends React.Component {
  constructor(props) {
    super(props);

    this.props.websiteFetch();
  }
  render() {
    return (
      <section>
        <h1>Reviewing Websites</h1>
        <WebsiteReviewList submissions={this.props.websiteSubmissions}/>
      </section>
    );
  }
};


export default connect(
  reviewWebsiteListingSelector,
  dispatch => bindActionCreators({
    websiteFetch
  }, dispatch)
)(WebsiteReviewListing);


const WebsiteReviewList = React.createClass({
  render() {
    return (
      <ul>
        {this.props.submissions.map(submission =>
                                    (<WebsiteReviewListingItem {...submission}/>))}
        {this.props.submissions.length === 0 ?
        <p>No submissions to review.</p> :
        ''}
      </ul>
    );
  }
});


const WebsiteReviewListingItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  approve() {
    alert('Sorry, the development of reviewer tools have been paused. ' +
          'Approving websites has not yet been implemented.');
  },
  render() {
    return (
      <li>
        <div>
          <img src={this.props.detected_icon}/>
          <h2>{this.props.name}</h2>
        </div>
        <dl>
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
        <div>
          <ReverseLink to="website-review-form" params={{id: this.props.id}}>
            <button>Edit</button>
          </ReverseLink>
          <button onClick={this.approve}>
            Approve
          </button>
        </div>
      </li>
    );
  }
});
