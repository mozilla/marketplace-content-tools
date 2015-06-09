/*
  Wizard Store. Keeps track of active step.

  Intended to be extended.
*/
import LocalStore from 'flummox-localstore'


export default class WizardStore extends LocalStore {
   constructor(flux) {
     super(flux, {
        initialState: {
          activeStep: 0,
        }
    });
  }
  goToNextStep() {
    this.goToStep(this.state.activeStep + 1);
  }
  goToPrevStep() {
    this.goToStep(this.state.activeStep - 1);
  }
  goToStep(newStep) {
    this.setState({
      activeStep: newStep,
    });
  }
}
