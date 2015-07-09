import React from 'react';


const SubmissionUrlForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    isLoading: React.PropTypes.bool,
    mobileFriendlyData: React.PropTypes.object,
    successfullySubmittedUrl: React.PropTypes.string,
    url: React.PropTypes.string
  },
  getInitialState() {
    return {
      // this.props.url only for initializing from store.
      submissionUrl: this.props.url
    };
  },
  renderSuccessMsg() {
    if (this.props.successfullySubmittedUrl) {
      return <div className="form-msg--success">
        <p>
          <span>You have just successfully submitted </span>
          <span className="submission--url-success">
            {this.props.successfullySubmittedUrl}
          </span>
          <span>!</span>
        </p>
      </div>
    }
  },
  renderMobileFriendlyErr() {
    if (this.props.url && this.props.mobileFriendlyData &&
        !this.props.mobileFriendlyData.isMobileFriendly) {
      return <div className="form-msg--error">
        <p>
          Sorry, {this.props.url} was not detected as mobile-friendly.
          We are not accepting non-mobile-friendly sites at this time.
          Please enter another website.
        </p>
      </div>
    }
  },
  render() {
    const flux = this.props.flux;

    const onSubmit = e => {
      e.preventDefault();

      flux.getActions('submission').submitUrl(
        e.currentTarget.elements.submissionUrl.value);
    };

    let placeholder = "Enter a website URL...";
    if (this.props.successfullySubmittedUrl) {
      placeholder = "Enter another website URL...";
    }

    const buttonProps = {
      type: 'submit',
      disabled: this.props.isLoading
    };

    return <div className="submission--url-step">
      {this.renderSuccessMsg()}
      {this.renderMobileFriendlyErr()}

      <form className="form-inline submission--url-form" onSubmit={onSubmit}>
        <label htmlFor="submission--url">URL:</label>
        <input id="submission--url" className="submission--url"
               name="submissionUrl" placeholder={placeholder} required
               type="url" valueLink={this.linkState('submissionUrl')}/>
        <button {...buttonProps}>
          {this.props.isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  }
});
export default SubmissionUrlForm;
