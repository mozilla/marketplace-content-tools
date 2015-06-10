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
  renderProgressBarBtn(stepTitle, index) {
    const isActive = index === this.props.activeStep;
    const itemClassNames = {
      'wizard-progress-bar-item': true
    };

    if (isActive) {
      itemClassNames['wizard-progress-bar-active'] = true;
      return <span className={classnames(itemClassNames)} key={index}>
        {stepTitle}
      </span>
    } else if (this.props.goToStep && this.props.activeStep > index) {
      // Only allow going backwards.
      itemClassNames['wizard-progress-bar-btn'] = true;
      return <a className={classnames(itemClassNames)} key={index}
                onClick={this.props.goToStep(index)}
                title="Back to previous step">
        {stepTitle}
      </a>
    } else {
      return <span className={classnames(itemClassNames)} key={index}>
        {stepTitle}
      </span>
    }
  },
  render() {
    return <menu className="wizard--progress-bar">
      {this.props.steps.map(this.renderProgressBarBtn)}
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

    return <section className="wizard-step" style={stepStyle}>
      {this.props.form}
    </section>
  }
});
export {WizardStep};


export default Wizard;
