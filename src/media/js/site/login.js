import React from 'react';
import {connect} from 'react-redux';

import * as tosActions from './actions/tos';
import {Page, PageSection} from './components/page';
import LoginHandler from './containers/login'
import TOSSignatureContainer from './containers/tos';


export class UnauthorizedHandler extends React.Component {
  render() {
    return (
      <Page className="no-permissions" title="Missing Permissions">
        <PageSection>
          <p>
            For now, Firefox OS add-on submission is restricted to beta testers.
          </p>
          <p>
            Were you recently granted access? Try logging out and then logging
            back in.
          </p>
        </PageSection>
      </Page>
    );
  }
};


export function loginRequired(Component, group) {
  /* Wraps a handler component to require login.
     Subscribes to the user store such that it will automatically
     "redirect" to the page after successful login. */
  @connect(
    state => ({user: state.user})
  )
  class AuthenticatedComponent extends React.Component {
    render() {
      if (!!this.props.user.token || process.env.MOCK_DATA) {
        const hasPermission = checkPermissions(this.props.user, group);
        const hasSignedTOS = ('tos' in this.props.user &&
                              this.props.user.tos.has_signed);

        if ((hasPermission && hasSignedTOS) || process.env.MOCK_DATA) {
          return <Component user={this.props.user}/>;

        // Redirect to UnauthorizedHandler if logged in but lacking permission.
        } else if (!hasPermission) {
          return <UnauthorizedHandler/>;

        // Redirect to TOSSignatureContainer if the user hasn't signed the TOS.
        } else if (!hasSignedTOS) {
          return <TOSSignatureContainer/>;
        }

      // Redirect to LoginHandler if not logged in.
      } else {
        return <LoginHandler/>
      }
    }
  }
  return AuthenticatedComponent;
}


export function checkPermissions(user, group) {
  if (!user.token) {
    return false;
  }
  if (!group) {
    // If no group is specified, then simply return true.
    return true;
  }
  if (group.constructor === String && user.permissions[group]) {
    // Check if the user has the group permission.
    return true;
  } else if (group.constructor === Array) {
    // Check if the user has ALL of the group permissions.
    for (let i = 0; i < group.length; i++) {
      if (!user.permissions[group[i]]) {
        return false;
      }
    }
    return true;
  }
}
