import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/review';
import addonReviewSelector from '../selectors/review';


export class AddonReview extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    fetch: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetch();
  }
  render() {
    return <section>
      <h1>Reviewing Firefox OS Add-ons</h1>
      {this.props.addons}
    </section>
  }
};


export default connect(
 array addonReviewSelector,
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonReview);
