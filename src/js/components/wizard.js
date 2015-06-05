import FluxComponent from 'flummox/component';
import React from 'react';


let Wizard = React.createClass({
  render() {
    let steps = this.props.children.map(
      (step, index) => React.cloneElement(step, {
        key: index,
        isActive: index === this.props.activeStep
      })
    , this);
    return <section className="wizard">
      <Wizard.ProgressBar wizard={this}/>
      {steps}
      <Wizard.Menu wizard={this}/>
    </section>
  }
});


Wizard.ProgressBar = React.createClass({
  propTypes: {
    wizard: React.PropTypes.instanceOf(Wizard).isRequired
  },
  goToStep(num) {
    return () =>
      { this.props.wizard.props.flux.getActions('wizard').goToStep(num) }  
  },
  render() {
    return <menu className="wizard--progress-bar">
      {this.props.wizard.props.children.map(
        (step, index) => 
          <Wizard.ProgressItem handleClick={this.goToStep(index)}
                               key={index} step={step}/>
      )}
    </menu>
  }
});


Wizard.ProgressItem = React.createClass({
  propTypes: {
    handleClick: React.PropTypes.func
  },
  render() {
    return <button onClick={this.props.handleClick}>
      {this.props.step.props.title}
    </button>
  }
});;


Wizard.Step = React.createClass({
  propTypes: {
    isActive: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  },
  stepStyle() {
    return { display: this.props.isActive ? 'block': 'none' }
  },
  render() {
    return <section className="wizard--step" style={this.stepStyle()}>
      <h2>{this.props.title}</h2>
      {this.props.children}
    </section>
  }
});

Wizard.Menu = React.createClass({
  propTypes: {
    wizard: React.PropTypes.instanceOf(Wizard).isRequired
  },
  actions() {
    return this.props.wizard.props.flux.getActions('wizard');  
  },
  goToPrevStep() {
    this.actions().goToPrevStep(this.props.wizard)
  },
  goToNextStep() {
    this.actions().goToNextStep(this.props.wizard)
  },
  render() {
    return <menu className="wizard--menu">
      <Wizard.MenuItem handleClick={this.goToPrevStep} title="Back"/>
      <Wizard.MenuItem handleClick={this.goToNextStep} title="Forward"/>
    </menu>
  }
});


Wizard.MenuItem = React.createClass({
  propTypes: {
    handleClick: React.PropTypes.func,
    title: React.PropTypes.string.isRequired
  },
  render() {
    return <button onClick={this.props.handleClick}>{this.props.title}</button>
  }
});


export default Wizard;
