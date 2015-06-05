import FluxComponent from 'flummox/component';
import React from 'react';

import Wizard from '../wizard';


var Submission = React.createClass({
  render() {
    return (
      <FluxComponent connectToStores={'wizard'}>
        <Wizard>
          <Wizard.Step title="Website URL">
            <p>Step 1</p>
          </Wizard.Step>
          <Wizard.Step title="Website Compatability">
            <p>Step 2</p>
          </Wizard.Step>
          <Wizard.Step title="Website Metadata">
            <p>Step 3</p>
          </Wizard.Step>
        </Wizard>
      </FluxComponent>
    )
  }
});


export default Submission;
