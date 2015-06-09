import LocalStore from 'flummox-localstore'


export default class WizardStore extends LocalStore {
   constructor(flux) {
     super(flux, {
        initialState: {
          activeStep: 0,
          numSteps: 0,
          prevDisabled: true,
          nextDisabled: false
        }
    });
  }
  setNumSteps(num) {
    this.setState({
      numSteps: num
    });
  }
  goToPrevStep() {
    this.goToStep(this.state.activeStep - 1);
  }
  goToNextStep() {
    this.goToStep(this.state.activeStep + 1);
  }
  goToStep(newStep) {
    this.setState({
      activeStep: newStep,
      prevDisabled: newStep === 0,
      nextDisabled: newStep === this.state.numSteps - 1
    });
  }
}
