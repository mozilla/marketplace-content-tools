/*
  Wizard Store. Keeps track of active step.

  Intended to be extended.
*/
import LocalStore from 'flummox-localstore'


export default class WizardStore extends LocalStore {
  constructor(flux) {
     super(flux, {
        key: 'WizardStore',
        initialState: {
          activeStep: 0,
          highestStep: 0
        }
    });
  }
  _resetState() {
    this.replaceState({
      activeStep: 0,
      highestStep: 0
    });
  }
  goToNextStep() {
    this.goToStep(this.state.activeStep + 1);
  }
  goToPrevStep() {
    this.goToStep(this.state.activeStep - 1);
  }
  goToStep(newStep) {
    let highestStep = this.state.highestStep;
    if (newStep > this.state.highestStep) {
      highestStep: this.state.activeStep;
    }

    this.setState({
      activeStep: newStep,
      highestStep: highestStep,
    });
  }
}
