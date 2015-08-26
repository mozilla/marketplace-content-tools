import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch, publish, reject} from '../actions/review';
import {AddonListing} from '../components/addon';
import addonReviewSelector from '../selectors/review';


export class AddonReview extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    fetch: React.PropTypes.func,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetch();
  }
  render() {
    return (
      <section>
        <h1>Reviewing Firefox OS Add-ons</h1>
        <AddonListing addons={this.props.addons}
                      isReview={true}
                      publish={this.props.publish}
                      reject={this.props.reject}/>
      </section>
    );
  }
};


export default connect(
  addonReviewSelector,
  dispatch => bindActionCreators({
    fetch,
    publish,
    reject,
  }, dispatch)
)(AddonReview);
