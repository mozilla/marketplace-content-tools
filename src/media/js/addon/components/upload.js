/*
  Dumb component for add-on uploads to share between add-on submission and
  add-on version submission.
*/
import React from 'react';
import FileReaderInput from 'react-file-reader-input';

import ProgressBar from './progressBar';


export default class AddonUpload extends React.Component {
  /*
    slug (string) -- only used in new version submissions.
  */
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    messageChange: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
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
      fileName: null,
      isShowingMessageBox: false,
      message: null,
    };
  }

  handleChange = (e, results) => {
    const [result, file] = results[0];
    this.setState({
      fileData: result.target.result,
      fileSize: result.loaded,
      fileName: file.name,
      isShowingMessageBox: true
    });
  }

  handleMessageChange = e => {
    this.props.messageChange(e.target.value);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.fileData, this.props.slug);
  }

  render() {
    const KB_DIVISOR = 1024;
    const MB_DIVISOR = 1048576;

    let divisor = MB_DIVISOR;
    let unit = 'MB'
    if (this.state.fileSize < 1000 * KB_DIVISOR) {
      // Show KBs if less than 1MB.
      divisor = KB_DIVISOR;
      unit = 'KB';
    }
    const fileSize = toFixedDown(this.state.fileSize / divisor, 2);

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
               `${this.state.fileName} (${fileSize}${unit})` :
               'Select a File...'}
            </div>
         </FileReaderInput>

          <button type="submit" disabled={this.props.isSubmitting}>
            {this.props.isSubmitting ? 'Processing...' : 'Submit'}
          </button>

          {this.state.isShowingMessageBox &&
            <textarea
              onChange={this.handleMessageChange}
              placeholder="Attach submission notes for reviewers..."
              rows="10" value={this.state.message}/>
          }
        </form>

        {this.props.uploadLoaded &&
         this.props.uploadLoaded < this.props.uploadTotal &&
          <div>
            <h3>Uploading your Firefox OS Add-on</h3>
            <ProgressBar loadedSize={this.props.uploadLoaded / divisor}
                         totalSize={this.props.uploadTotal / divisor}
                         unit={unit}/>
          </div>
        }

        {this.props.validationErrorMessage &&
          <p className="form-msg--error">
            {this.props.validationErrorMessage}
          </p>
        }
      </div>
    );
  }
}


function toFixedDown(number, digits) {
  const re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)");
  const m = number.toString().match(re);
  return m ? parseFloat(m[1]) : number.valueOf();
}
