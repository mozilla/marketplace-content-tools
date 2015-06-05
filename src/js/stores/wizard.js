import LocalStore from 'flummox-localstore'

export default class WizardStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      initialState: {
        activeStep: 0
      }
    });

    const wizardActionIds = flux.getActionIds('wizard');
    this.register(wizardActionIds.goToPrevStep, this.changeStep);
    this.register(wizardActionIds.goToNextStep, this.changeStep);
    this.register(wizardActionIds.goToStep, this.changeStep);
  }
  changeStep(newStep) {
    this.setState({
      activeStep: newStep
    });
  }
}
