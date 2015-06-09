/*
  The Wizard component takes `steps` as a prop, where `steps` is an
*/

import classnames from 'classnames';
import FluxComponent from 'flummox/component';
import React from 'react';

import Flux from '../flux';


const Wizard = React.createClass({
  propTypes: {
    activeStep: React.PropTypes.number.isRequired,
    steps: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      onSubmit: React.PropTypes.func,
      form: React.PropTypes.oneOfType([React.PropTypes.element,
                                       React.PropTypes.node]),
    }))
  },
  renderProgressBarStep(step, index) {
    if (this.props.goToStep) {
      return <button onClick={this.props.goToStep(index)} key={index}>
        {step.title}
      </button>
    }
    return <span>{step.title}</span>
  },
  renderStep(step, index) {
    return <WizardStep {...step} key={index} flux={this.props.flux}
                       isActive={index === this.props.activeStep}/>
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

      <menu className="wizard--paginator">
        <button onClick={this.props.goToPrevStep}
                disabled={this.props.activeStep === 0}
                ref="prev">
          Back
        </button>
        <button onClick={this.props.goToNextStep}
                disabled={this.props.activeStep ===
                          this.props.steps.length - 1}
                ref="next">
          Forward
        </button>
      </menu>
    </section>
  }
});
export {Wizard as Wizard}


const WizardStep = React.createClass({
  propTypes: {
    form: React.PropTypes.element,
    isActive: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    title: React.PropTypes.string.isRequired
  },
  componentDidMount() {
    // Hook up the submit callback, passing in the form and Flux instance.
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
      <div className="wizard--form" ref="form">
        <FluxComponent ref="form">
          {this.props.form}
        </FluxComponent>
      </div>
    </section>
  }
});


export default Wizard;
