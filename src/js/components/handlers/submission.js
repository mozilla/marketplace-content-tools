import FluxComponent from 'flummox/component';
import React from 'react';

import Wizard from '../wizard';


var Submission = React.createClass({
  render() {
    return (
      <FluxComponent connectToStores={'wizard'}>
        <Wizard className="submission">
          <Wizard.Step title="Step 1: Website URL">
            <form>
              <label htmlFor="submission--url">Website URL</label>
              <input id="submission--url" className="submission-url"
                     placeholder="Enter a website URL..."/>
            </form>
          </Wizard.Step>
          <Wizard.Step title="Step 2: Website Compatability">
            <p>Under Construction</p>
          </Wizard.Step>
          <Wizard.Step title="Step 3: Website Metadata">
            <p>Under Construction</p>
          </Wizard.Step>
        </Wizard>
      </FluxComponent>
    )
  }
});


export default Submission;
