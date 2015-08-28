import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/dashboard';
import {AddonListing} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import listify from '../selectors/listify';
import PageHeader from '../../site/components/pageHeader';


export class AddonDashboard extends React.Component {
  static PropTypes = {
    addons: React.PropTypes.array,
    fetch: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetch();
  }
  render() {
    return (
      <section>
        <PageHeader title="My Firefox OS Add-ons" subnav={<AddonSubnav/>}/>
        <AddonListing addons={this.props.addons}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    addons: listify(state.addonDashboard.addons)
  }),
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonDashboard);
