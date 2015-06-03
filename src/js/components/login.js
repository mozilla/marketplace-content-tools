import FluxComponent from 'flummox/component';
import React from 'react';

import {FxaLoginButton} from './fxa';


let MktLoginButton = React.createClass({
  render() {
    return <FluxComponent connectToStores={['siteConfig']}>
      <FxaLoginButton clientId='abc' signup={this.props.signup}/>
    </FluxComponent>
  }
});
export {MktLoginButton as MktLoginButton};
