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


module.exports = Landing;
