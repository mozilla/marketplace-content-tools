import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/dashboard';
import {AddonListing} from '../components/addon';
import dashboardSelector from '../selectors/dashboard';


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
        <h1>My Firefox OS Add-ons</h1>
        <AddonListing addons={this.props.addons}/>
      </section>
    );
  }
};


export default connect(
  dashboardSelector,
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonDashboard);
