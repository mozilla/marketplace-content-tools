import classnames from 'classnames';
import React from 'react';


const Wizard = React.createClass({
  propTypes: {
    activeStep: React.PropTypes.number.isRequired,
    goToStep: React.PropTypes.func,
    steps: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      form: React.PropTypes.oneOfType([React.PropTypes.element,
                                       React.PropTypes.node]),
    }))
  },
  renderStep(step, index) {
    return <WizardStep {...step} key={index}
                       isActive={index === this.props.activeStep}/>
  },
  render() {
    return <section className="wizard">
      <WizardProgressBar {...this.props}
                         steps={this.props.steps.map(step => step.title)}/>
      {this.props.steps.map(this.renderStep)}
    </section>
  }
});
export {Wizard}


const WizardProgressBar = React.createClass({
  propTypes: {
    activeStep: React.PropTypes.number,
    goToStep: React.PropTypes.func,
    steps: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  renderProgressBarStep(step, index) {
    if (this.props.goToStep) {
      return <button className="wizard--progress-bar-step"
                     onClick={this.props.goToStep(index)} key={index}>
        {step}
      </button>
    }
    return <span key={index}>{step}</span>
  },
  render() {
    return <menu className="wizard--progress-bar">
      {this.props.steps.map(this.renderProgressBarStep)}
    </menu>
  }
});


const WizardStep = React.createClass({
  propTypes: {
    form: React.PropTypes.oneOfType([React.PropTypes.element,
                                     React.PropTypes.node]),
    isActive: React.PropTypes.bool,
    title: React.PropTypes.string
  },
  render() {
    const stepStyle = {
      display: this.props.isActive ? 'block': 'none'
    };

    return <section className="wizard--step" style={stepStyle}>
      <h2>{this.props.title}</h2>
      <div className="wizard--form" ref="form">
        {this.props.form}
      </div>
    </section>
  }
});
export {WizardStep};


export default Wizard;
