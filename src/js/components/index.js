import React from 'react';

import {MktLoginButton} from './login';


var Landing = React.createClass({
  render: function() {
    return <p>
      Welcome.
      <MktLoginButton/>
    </p>
  }
});
export {Landing as Landing}
