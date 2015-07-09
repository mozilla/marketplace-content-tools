import LocalStore from 'flummox-localstore';

import WizardStore from './wizard';


export default class SubmissionStore extends WizardStore {
  constructor(flux) {
    super(flux, {
        key: 'SubmissionStore'
    });

    const submitActions = flux.getActionIds('submission');
    this.registerAsync(submitActions.submitUrl, this.beginSubmitUrlHandler,
                       this.submitUrlHandler);
    this.register(submitActions.setNumSteps, this.setNumSteps);
    this.register(submitActions.goToStep, this.goToStep);

    const submitMetadataFormActions = flux.getActionIds(
      'submissionMetadataForm');
    this.register(submitMetadataFormActions.submitMetadata,
                  this.submitMetadataHandler);

    this.state.isLoading = false;
    delete this.state.successfullySubmittedUrl;
 }
 beginSubmitUrlHandler(data) {
    // Called when action for submitting a URL begins.
    this.setState({
      isLoading: true
    });
 }
 submitUrlHandler(data) {
    // Don't continue if not mobile-friendly.
    const isMobileFriendly = data.mobileFriendlyData.ruleGroups.USABILITY.pass;
    const activeStep = isMobileFriendly ? ++this.state.activeStep :
                                          this.state.activeStep;

    this.setState({
      activeStep: activeStep,
      highestStep: activeStep,  // Reset highest step.
      isLoading: false,
      mobileFriendlyData: {
        isMobileFriendly: isMobileFriendly,
        screenshot: this._formatScreenshot(data.mobileFriendlyData.screenshot)
      },
      successfullySubmittedUrl: null,
      url: data.url
    });
  }
  submitMetadataHandler(data) {
    const url = this.state.url;

    this._resetState();
    this.setState({
      successfullySubmittedUrl: url
    });
  }
  _formatScreenshot(screenshot) {
    let screenshotData = screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
    return `data:${screenshot.mime_type};base64,${screenshotData}`;
  }
}
