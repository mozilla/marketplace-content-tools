import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/reviewUpdates';
import {reviewerSearch} from '../actions/search';
import AddonReview from '../components/review';
import {addonPageSelector} from '../selectors/addon';


export class AddonReviewUpdatesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetch(this.props.queue.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queue.page !== this.props.queue.page) {
      this.props.fetch(this.props.queue.page);
    }
  }

  render() {
    return (
      <AddonReview {...this.props} {...this.props.queue}
                   pageLinkTo='addon-review-updates-page'
                   title='Updates Queue'/>
    );
  }
}

export default connect(
  state => ({
    addonSearch: state.addonSearch,
    queue: addonPageSelector(state.addonReviewUpdates, state.router),
    user: state.user
  }),
  dispatch => bindActionCreators({
    fetch,
    search: reviewerSearch
  }, dispatch)
)(AddonReviewUpdatesContainer);
