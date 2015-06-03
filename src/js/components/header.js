import React from 'react';

import {MktLoginButton} from './login';


var Header = React.createClass({
  render() {
    return <header>
      <h1>Firefox Marketplace</h1>
      <MktLoginButton/>
    </header>
  }
});


export default Header;
