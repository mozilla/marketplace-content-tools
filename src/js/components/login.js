import React from 'react';

import {FxaLoginButton} from './fxa';


let MktLoginButton = React.createClass({
  render() {
    return <FxaLoginButton clientId='abc' authUrl='def' authState='ghi'
                           signup={false}>
    </FxaLoginButton>
  }
});
export {MktLoginButton as MktLoginButton};
