/*
  Dumb component for add-on uploads to share between add-on submission and
  add-on version submission.
*/
import React from 'react';
import FileReaderInput from 'react-file-reader-input';


export default class AddonUpload extends React.Component {
  /*
    slug -- only used in new version submissions.
  */
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    slug: React.PropTypes.string,
    submit: React.PropTypes.func.isRequired,
    validationErrorMessage: React.PropTypes.string
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
    this.props.submit(this.state.fileData, this.props.slug);
  }

  render() {
    return (
      <div>
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
          <button type="submit" disabled={this.props.isSubmitting}>
            {this.props.isSubmitting ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {this.props.validationErrorMessage &&
          <p className="form-msg--error">
            {this.props.validationErrorMessage}
          </p>
        }
      </div>
    );
  }
}
