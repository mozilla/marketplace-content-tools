/*
  Dumb component for add-on uploads to share between add-on submission and
  add-on version submission.
*/
import classnames from 'classnames';
import React from 'react';
import FileReaderInput from 'react-file-reader-input';

import ProgressBar from './progressBar';
import ValidationError from './validationError';
import * as constants from '../constants';


export default class AddonUpload extends React.Component {
  /*
    slug (string) -- only used in new version submissions.
  */
  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    messageChange: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
    validationError: React.PropTypes.any
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
      message: null,
    };
  }

  handleChange = (e, results) => {
    const [result, file] = results[0];
    this.setState({
      fileData: result.target.result,
      fileSize: result.loaded,
      fileName: file.name,
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

    const showProgressBar = (this.props.uploadLoaded &&
                             this.props.uploadLoaded < this.props.uploadTotal);

    return (
      <div className="addon-upload">
        {this.props.addon && this.props.addon.latest_version &&
         this.props.addon.latest_version.status ===
         constants.STATUS_PENDING &&
          <p className="addon-upload-note">
            <b>Note:</b> there is currently a pending version awaiting review.
            Uploading a new version will permanently change the currently
            pending version to an obsolete status. An obsolete version
            can no longer be reviewed. However, the newly pending version
            can be reviewed.
          </p>
        }

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className={classnames({
            'field': true,
            'field--error': !!this.props.validationError,
          })}>
            <label htmlFor="submission-addon--zip">Add-on:</label>
            <FileReaderInput as="buffer" accept=".zip"
                             id="submission-addon--zip"
                             onChange={this.handleChange}>
              <div className="form-inline--file-input"
                   data-file-input--has-data={!!this.state.fileName}>
                {this.state.fileName ?
                 `${this.state.fileName} (${fileSize}${unit})` :
                 'Select file...'}
              </div>
            </FileReaderInput>
            <p className="form-msg form-msg--help">
              Must be packaged as a .zip file. All metadata&mdash;such as
              add-on name and description are configured via the add-on&apos;s
              manifest file. Learn more about <a
              href="https://developer.mozilla.org/docs/Mozilla/Firefox_OS/Add-ons#The_anatomy_of_a_Firefox_OS_add-on">
                packaging Firefox OS add-ons
              </a>.
            </p>
            {this.props.validationError &&
             Object.keys(this.props.validationError).length &&
              <ValidationError error={this.props.validationError}/>
            }
          </div>

          <div className="field">
            <label htmlFor="note">Reviewer note:</label>
            <textarea onChange={this.handleMessageChange} id="note">
              {this.state.message}
            </textarea>
            <p className="form-msg form-msg--help">
              Include any information that might be helpful for add-on
              reviewers while they look at your add-on.
            </p>
          </div>

          <div className="field field--buttons">
            <button type="submit"
                    disabled={!this.state.fileName || this.props.isSubmitting}>
              {this.props.isSubmitting ? 'Uploading...' : 'Submit'}
            </button>
            {showProgressBar &&
              <ProgressBar loadedSize={this.props.uploadLoaded / divisor}
                           totalSize={this.props.uploadTotal / divisor}
                           unit={unit}/>
            }
          </div>
        </form>
      </div>
    );
  }
}


function toFixedDown(number, digits) {
  const re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)");
  const m = number.toString().match(re);
  return m ? parseFloat(m[1]) : number.valueOf();
}
