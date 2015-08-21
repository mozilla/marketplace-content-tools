import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {validate as validateAddon} from '../../actions/submissionAddon';


export class SubmissionAddon extends React.Component {
  static propTypes = {
    isProcessing: React.PropTypes.bool,
    validateAddon: React.PropTypes.func.isRequired,
    validationErrorMsg: React.PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      addonFile: null
    };
  }
  handleChange = e => {
    console.log(e.currentTarget);
    this.setState({
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.validateAddon(this.state.addonFile);
  }
  render() {
    return <section className="submission-addon">
      <h1>Submitting a Firefox OS Add-on</h1>

      <form className="form-inline" onSubmit={this.handleSubmit}>
        <label htmlFor="submission-addon--zip">Add-on ZIP File:</label>
        <input id="submission-addon--zip" onChange={this.handleChange}
               type="file"/>
        <button type="submit">
          {this.props.isProcessing ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {this.props.validationErrMsg && <p className="form-msg--error">
        {this.props.validationErrMsg}
      </p>}
    </section>
  }
}


export default connect(
  state => ({
    isProcessing: !!state.submissionAddon.validationId,
    validationErrorMsg: state.submissionAddon.validationErrorMsg,
  }),
  dispatch => bindActionCreators({
    validateAddon
  }, dispatch)
)(SubmissionAddon);
