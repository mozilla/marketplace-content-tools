import FluxComponent from 'flummox/component';
import React from 'react';

import {LoginButton} from '../login';


export default class Login extends React.Component {
  render() {
    return <section className="login-handler">
      <FluxComponent>
        <h2>You must be logged in to access these tools.</h2>
        <LoginButton/>
      </FluxComponent>
    </section>
  }
}
