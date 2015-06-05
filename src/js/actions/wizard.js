import {Actions} from 'flummox';


export default class WizardActions extends Actions {
  goToPrevStep(wizard) {
    return --wizard.props.activeStep;
  }
  goToNextStep(wizard) {
    return ++wizard.props.activeStep;
  }
  goToStep(num) {
    return num;
  }
}
