import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch, publish, reject} from '../actions/review';
import {Addon} from '../components/addon';


export class AddonReviewDetail extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    // fetch: React.PropTypes.func,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    // this.props.fetch();
  }
  render() {
    const addon = this.props.addons[this.props.slug];
    return (
      <section>
        <h1>{`Reviewing Firefox OS Add-on: ${addon.name}`}</h1>
        <Addon {...addon}
               isReview={true}
               publish={this.props.publish}
               reject={this.props.reject}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    addons: state.addonReview,
    slug: state.router.params.slug,
  }),
  dispatch => bindActionCreators({
    // fetch,
    publish,
    reject,
  }, dispatch)
)(AddonReviewDetail);
