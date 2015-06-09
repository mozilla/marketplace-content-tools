import classnames from 'classnames';
import FluxComponent from 'flummox/component';
import React from 'react';

import Flux from '../flux';


const Wizard = React.createClass({
  renderProgressBarStep(step, index) {
    return <button onClick={this.props.goToStep(index)} key={index}>
      {step.title}
    </button>
  },
  renderStep(step, index) {
    return <WizardStep isActive={index === this.props.activeStep} key={index}
                       flux={this.props.flux} title={step.title}
                       form={step.form} onSubmit={step.onSubmit}/>
  },
  render() {
    // Allow configuring classname.
    const wizardClassNames = classnames({
      wizard: true,
      [this.props.className || '']: true,
    });

    return <section classNames={wizardClassNames}>
      <menu className="wizard--progress-bar">
        {this.props.steps.map(this.renderProgressBarStep)}
      </menu>

      {this.props.steps.map(this.renderStep)}

      <button onClick={this.props.goToPrevStep}
              disabled={this.props.prevDisabled}>Back</button>
      <button onClick={this.props.goToNextStep}
              disabled={this.props.nextDisabled}>Forward</button>
    </section>
  }
});
export {Wizard as Wizard}


const WizardStep = React.createClass({
  propTypes: {
    flux: React.PropTypes.instanceOf(Flux).isRequired,
    form: React.PropTypes.element,
    isActive: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    title: React.PropTypes.string.isRequired
  },
  componentDidMount() {
    // Hook up the submit callback.
    const root = this;
    const form = React.findDOMNode(this.refs.form).querySelector('form');
    if (form) {
      form.onsubmit = e => {
        e.preventDefault();
        root.props.onSubmit(form, root.props.flux);
        return false;
      }
    }
  },
  render() {
    const stepStyle = {
      display: this.props.isActive ? 'block': 'none'
    };

    return <section className="wizard--step" style={stepStyle}>
      <h2>{this.props.title}</h2>
      <div ref="form">
        <FluxComponent ref="form">
          {this.props.form}
        </FluxComponent>
      </div>
    </section>
  }
});


export default Wizard;
