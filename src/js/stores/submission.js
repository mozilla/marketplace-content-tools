import LocalStore from 'flummox-localstore';

import WizardStore from './wizard';


export default class SubmissionStore extends WizardStore {
  constructor(flux) {
    super(flux);

    const submitActions = flux.getActionIds('submission');
    this.register(submitActions.submitUrl, this.submitUrlHandler);
    this.register(submitActions.setNumSteps, this.setNumSteps);
    this.register(submitActions.goToPrevStep, this.goToPrevStep);
    this.register(submitActions.goToNextStep, this.goToNextStep);
    this.register(submitActions.goToStep, this.goToStep);
 }
 submitUrlHandler(data) {
    this.setState({
      activeStep: ++this.state.activeStep,
      url: data.url,
      screenshot: data.mobileReady.screenshot.data,
      mobileReadyPass: data.mobileReady.ruleGroups.USABILITY.pass
    });
  }
}
