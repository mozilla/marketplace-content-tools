import React from 'react';

import {LoginButton} from './login';


var Header = React.createClass({
  render() {
    return <header>
      <h1>Firefox Marketplace</h1>
      <LoginButton/>
    </header>
  }
});


export default Header;
