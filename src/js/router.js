'use strict';

var React = require('react');
var Wizard = require('./components/wizard');

var MainView = React.createClass({

  render: function() {
    return (
      <Wizard>
        <Wizard.Step title="Website URL">
          <p>Page 1</p>
        </Wizard.Step>
        <Wizard.Step title="Website Compatability">
          <p>Page 2</p>
        </Wizard.Step>
        <Wizard.Step title="Website Metadata">
          <p>Page 3</p>
        </Wizard.Step>
      </Wizard>
    );
  }

});

module.exports = MainView;
