import classnames from 'classnames';
import FluxComponent from 'flummox/component';
import React from 'react';

import Flux from '../flux';


const Wizard = React.createClass({
  /*
    For props.steps, given an array of {title, onSubmit, form} objects, Wizard
    will construct <WizardStep>s for us.
  */
  renderStep(step, index) {
    return <WizardStep isActive={index === this.props.activeStep} key={index}
                       flux={this.props.flux} title={step.title}
                       form={step.form} onSubmit={step.onSubmit}/>
  },
  render() {
    const titles = this.props.steps.map(step => step.title);

    // Allow configuring classname.
    const wizardClassNames = classnames({
      wizard: true,
      [this.props.className || '']: true,
    });

    return <section className={wizardClassNames}>
      <WizardProgressBar flux={this.props.flux} titles={titles}/>
      {this.props.steps.map(this.renderStep)}
      <WizardMenu flux={this.props.flux}
                  currentStep={this.props.activeStep}
                  numSteps={this.props.steps.length}/>
    </section>
  }
});
export {Wizard as Wizard}


const WizardStep = React.createClass({
  propTypes: {
    flux: React.PropTypes.instanceOf(Flux).isRequired,
    form: React.PropTypes.element,
    onSubmit: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  },
  componentDidMount() {
    // Hook up the submit callback.
    const form = React.findDOMNode(this.refs.form).firstChild;

    form.onsubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(form, this.props.flux);
      return false;
    }
  },
  render() {
    const stepStyle = {
      display: this.props.isActive ? 'block': 'none'
    };

    return <section className="wizard--step" style={stepStyle}>
      <h2>{this.props.title}</h2>
      <div ref="form">
        {this.props.form}
      </div>
    </section>
  }
});


const WizardProgressBar = React.createClass({
  propTypes: {
    flux: React.PropTypes.instanceOf(Flux).isRequired,
    titles: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  goToStep(num) {
    return () => {
      this.props.flux.getActions('wizard').goToStep(num);
    };
  },
  renderButton(title, index) {
    return <button onClick={this.goToStep(index)} key={index}>
      {title}
    </button>
  },
  render() {
    return <menu className="wizard--progress-bar">
      {this.props.titles.map(this.renderButton)}
    </menu>
  }
});


const WizardMenu = React.createClass({
  propTypes: {
    flux: React.PropTypes.instanceOf(Flux).isRequired
  },
  prevDisabled() {
    return this.props.currentStep === 0;
  },
  nextDisabled() {
    return this.props.currentStep === this.props.numSteps - 1;
  },
  goToPrevStep() {
    this.props.flux.getActions('wizard').goToPrevStep();
  },
  goToNextStep() {
    this.props.flux.getActions('wizard').goToNextStep();
  },
  render() {
    return <menu className="wizard--menu">
      <button onClick={this.goToPrevStep}
              disabled={this.prevDisabled()}>Back</button>
      <button onClick={this.goToNextStep}
              disabled={this.nextDisabled()}>Forward</button>
    </menu>
  }
});


export default Wizard;
