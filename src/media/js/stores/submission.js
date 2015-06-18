import LocalStore from 'flummox-localstore';

import WizardStore from './wizard';


export default class SubmissionStore extends WizardStore {
  constructor(flux) {
    super(flux);

    const submitActions = flux.getActionIds('submission');
    this.register(submitActions.submitUrl, this.submitUrlHandler);
    this.register(submitActions.submitMetadata, this.submitMetadataHandler);
    this.register(submitActions.setNumSteps, this.setNumSteps);
    this.register(submitActions.goToStep, this.goToStep);

    delete this.state.successfullySubmittedUrl;
 }
 submitUrlHandler(data) {
    // Don't continue if not mobile-friendly.
    const isMobileFriendly = data.mobileFriendlyData.ruleGroups.USABILITY.pass;
    const activeStep = isMobileFriendly ? ++this.state.activeStep :
                                          this.state.activeStep;

    this.setState({
      activeStep: activeStep,
      highestStep: activeStep,  // Reset highest step.
      url: data.url,
      mobileFriendlyData: {
        isMobileFriendly: isMobileFriendly,
        screenshot: this._formatScreenshot(data.mobileFriendlyData.screenshot)
      },
      successfullySubmittedUrl: null
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
