import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export class SubmissionAddon extends React.Component {
  render() {
    return <section className="submission-addon">
      <h1>Submitting a Firefox OS Add-on</h1>

      <h2>Under Construction</h2>
    </section>
  }
}


export default connect(
  state => ({}),
  dispatch => bindActionCreators({}, dispatch)
)(SubmissionAddon);
