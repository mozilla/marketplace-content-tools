import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';


export class AddonReview extends React.Component {
  render() {
    return (
      <section>
        <h1>Reviewing a Firefox OS Add-on</h1>
        <h2>Under Construction</h2>
      </section>
    );
  }
};


export default connect(
  state => state,
  dispatch => bindActionCreators({}, dispatch)
)(AddonReview);
