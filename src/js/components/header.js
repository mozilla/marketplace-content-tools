import React from 'react';

import {LoginButton} from './login';


var Header = React.createClass({
  render() {
    return <header>
      <p className="header--icon"/>
      <h1>Submission Tools</h1>
      <div className="header--login">
        <LoginButton/>
        <LoginButton signup={true}/>
      </div>
    </header>
  }
});


export default Header;
