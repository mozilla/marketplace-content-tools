import React from 'react';
import {reverse} from 'react-router-reverse';
import {bindActionCreators} from 'redux';
import FileReaderInput from 'react-file-reader-input';
import {connect} from 'react-redux';

import {validate as submit} from '../actions/submit';


export class AddonSubmit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    isProcessing: React.PropTypes.bool,
    submit: React.PropTypes.func.isRequired,
    validationErrorMsg: React.PropTypes.string
  };
  constructor(props) {
    super(props);

    this.accept = [
      'application/octet-stream',
      'application/zip',
      'application/x-zip',
      'application/x-zip-compressed'
    ].join(',');

    this.state = {
      fileData: null,
      fileSize: null,
      fileName: null
    };
  }
  componentWillReceiveProps(nextProps) {
    // TODO: once we move to React 0.14, dispatch redux-react-router's
    // transitionTo in add-on submission actions instead. Doesn't work in 0.13.

    // Redirect to dashboard once submission is complete.
    if (this.props.isProcessing && !nextProps.isProcessing) {
      const path = reverse(this.context.router.routes, 'addon-dashboard');
      this.context.router.transitionTo(path);
    }
  }
  handleChange = (e, results) => {
    const [result, file] = results[0];
    this.setState({
      fileData: result.target.result,
      fileSize: result.loaded,
      fileName: file.name
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.fileData);
  }
  render() {
    return (
      <section>
        <h1>Submitting a Firefox OS Add-on</h1>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <label htmlFor="submission-addon--zip">Add-on ZIP File:</label>
          <FileReaderInput as="buffer" accept=".zip"
                           id="submission-addon--zip"
                           onChange={this.handleChange}>
            <div className="form-inline--file-input"
                 data-file-input--has-data={!!this.state.fileName}>
              {this.state.fileName ?
               `${this.state.fileName} (${this.state.fileSize}KB)` :
               'Select a File...'}
            </div>
          </FileReaderInput>
          <button type="submit" disabled={this.props.isProcessing}>
            {this.props.isProcessing ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {this.props.validationErrMsg && <p>
          {this.props.validationErrMsg}
        </p>}
      </section>
    );
  }
}


export default connect(
  state => ({
    isProcessing: !!state.addonSubmit.validationId,
    validationErrorMsg: state.addonSubmit.validationErrorMsg,
  }),
  dispatch => bindActionCreators({
    submit
  }, dispatch)
)(AddonSubmit);
