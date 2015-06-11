import LocalStore from 'flummox-localstore';

import WizardStore from './wizard';


export default class SubmissionStore extends WizardStore {
  constructor(flux) {
    super(flux, {
      initialState: {
        activeStep: 0,
        mobileFriendlyData: {}
      }
    });

    const submitActions = flux.getActionIds('submission');
    this.register(submitActions.submitUrl, this.submitUrlHandler);
    this.register(submitActions.setNumSteps, this.setNumSteps);
    this.register(submitActions.goToStep, this.goToStep);
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
        screenshot: this.formatScreenshot(data.mobileFriendlyData.screenshot)
      }
    });
  }
  formatScreenshot(screenshot) {
    screenshot = screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
    return `data:${screenshot.mime_type};base64,${screenshot}`;
  }
}
