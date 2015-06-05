import LocalStore from 'flummox-localstore'

export default class WizardStore extends LocalStore {
  constructor(flux) {
    super(flux);
    const wizardActionIds = flux.getActionIds('wizard');
    this.register(wizardActionIds.goToPrevStep, this.changeStep);
    this.register(wizardActionIds.goToNextStep, this.changeStep);
    this.register(wizardActionIds.goToStep, this.changeStep);
    this.state = {
      activeStep: 0
    };
  }
  changeStep(newStep) {
    this.setState({
      activeStep: newStep
    });
  }
}
