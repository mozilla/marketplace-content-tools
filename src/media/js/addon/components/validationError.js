import React from 'react';


export default class ValidationError extends React.Component {
  static propTypes = {
    error: React.PropTypes.object.isRequired,
  };

  errorMap = {
    NO_MANIFEST: this.renderErrorNoManifest,
    VERSION_INVALID: this.renderErrorVersionInvalid,
  };

  renderDefault() {
    return (
      <div className="form-msg form-msg--error">
        <p>{this.props.error.message || this.props.error}</p>
      </div>
    );
  }

  renderErrorNoManifest() {
    const mdnLink = 'https://developer.mozilla.org/Firefox_OS/Add-ons';
    return (
      <div className="form-msg form-msg--error">
        <p>Unable to find the add-on's manifest. Please check that:</p>
        <ul>
          <li>the archive contains a valid manifest.json file.</li>
          <li>
            the <code>manifest.json</code> file is in the root of the archive.
          </li>
          <li>
            the <code>manifest.json</code> file in the archive is
            UTF-8-encoded.
          </li>
        </ul>
        <p>
          Learn more about <a href={mdnLink} target="_blank">packaging
          Firefox OS Add-ons</a>.
        </p>
      </div>
    );
  }

  renderErrorVersionInvalid() {
    const helpLink = 'https://developer.chrome.com/extensions/manifest/version';
    return (
      <div className="form-msg form-msg--error">
        <p>
          The <a href={helpLink} target="_blank"><code>version</code> property
          </a> must be a string containing 1-4 dot-separated integers between 0
          and 65525.
        </p>
      </div>
    );
  }

  render() {
    if (!!this.props.error && this.props.error.key in this.errorMap) {
      return this.errorMap[this.props.error.key]();
    }
    return this.renderDefault();
  }
}
