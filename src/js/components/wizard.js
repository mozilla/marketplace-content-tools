'use strict';

var React = require('react');

var Wizard = React.createClass({
  getInitialState: function() {
    return {
      allowMoveForward: false,
      allowMoveBackward: false,
      activeStep: 0
    };
  },
  propTypes: {
    children: React.PropTypes.arrayOf(React.PropTypes.node)
  },
  moveBackward: function() {
    if (this.allowMoveBackward) {
      this.setState({
        activeStep: --this.state.activeStep
      });
    }
  },
  moveForward: function() {
    if (this.allowMoveForward) {
      this.setState({
        activeStep: ++this.state.activeStep
      });
    }
  },
  moveTo: function(step) {
    this.setState({
      activeStep: step
    });
  },
  render: function() {
    return (
      <div>
        <Wizard.Progress steps={ this.props.children } />
        { this.props.children }
        <Wizard.Menu steps={ this.props.children } />
      </div>
    );
  }
});

Wizard.Step = React.createClass({
  getInitialState: function(){
    return {};
  },
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function() {
    var hidden = {
      display: 'none'
    };
    return (
      <div>
        <h2>{ this.props.title }</h2>
      </div>
    );
  }
});

Wizard.Menu = React.createClass({

  getInitialState: function(){
    return {};
  },

  propTypes: {
    steps: React.PropTypes.arrayOf(React.PropTypes.element)
  },

  render: function() {
    return (
      <p>Menu</p>
    );
  }

});

Wizard.Progress = React.createClass({

  getInitialState: function() {
    return {};
  },

  propTypes: {
    steps: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
  },

  render: function() {
    return (
      <ol>
        {this.props.steps.map(function(step) {
          return <li>{ step.props.title }</li>
        })}
      </ol>
    );
  }

});

module.exports = Wizard;
