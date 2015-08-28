import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch, publish, reject} from '../actions/review';
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import PageHeader from '../../site/components/pageHeader';


export class AddonReviewDetail extends React.Component {
  static propTypes = {
    addon: React.PropTypes.object.isRequired,
    // fetch: React.PropTypes.func,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    // this.props.fetch();
  }

  render() {
    return (
      <section>
        <PageHeader
          title={`Reviewing Firefox OS Add-on: ${this.props.addon.name}`}
          subnav={<AddonSubnav/>}/>
        <Addon {...this.props.addon}
               isReview={true}
               publish={this.props.publish}
               reject={this.props.reject}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    addon: state.addonReview[state.router.params.slug],
  }),
  dispatch => bindActionCreators({
    // fetch,
    publish,
    reject,
  }, dispatch)
)(AddonReviewDetail);
