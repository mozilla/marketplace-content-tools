import LocalStore from 'flummox-localstore'


export default class WizardStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      initialState: {
        activeStep: 0
      }
    });

    const wizardActionIds = flux.getActionIds('wizard');
    this.register(wizardActionIds.goToPrevStep, this.goToPrevStep);
    this.register(wizardActionIds.goToNextStep, this.goToNextStep);
    this.register(wizardActionIds.goToStep, this.goToStep);
  }
  goToPrevStep() {
    this.setState({
      activeStep: --this.state.activeStep
    });
  }
  goToNextStep() {
    this.setState({
      activeStep: ++this.state.activeStep
    });
  }
  goToStep(step) {
    this.setState({
      activeStep: step
    });
  }
}
