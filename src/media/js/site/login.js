import React from 'react';
import {connect} from 'react-redux';


export class DefaultUnauthorizedHandler extends React.Component {
  render() {
    return (
      <section>
        <img src="http://i.imgur.com/X9Vgo96.gif"
             alt="Permission denied."/>
      </section>
    );
  }
};


export function loginRequired(Component, LoginHandler, group,
                              UnauthorizedHandler=DefaultUnauthorizedHandler) {
  /* Wraps a handler component to require login.
     Subscribes to the user store such that it will automatically
     "redirect" to the page after successful login. */
  @connect(
    state => ({user: state.user})
  )
  class AuthenticatedComponent extends React.Component {
    render() {
      const isLoggedIn = !!this.props.user.token;
      const hasPermission = _checkPermissions(this.props.user, group);

      if (process.env.NODE_ENV === 'test' || isLoggedIn && hasPermission) {
        return <Component/>;

      // Redirect to UnauthorizedHandler if logged in but lacking permission.
      } else if (isLoggedIn) {
        return <UnauthorizedHandler/>;

      // Redirect to LoginHandler if not logged in.
      } else {
        return <LoginHandler/>
      }
    }
  }
  return AuthenticatedComponent;
}


function _checkPermissions(user, group) {
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
    // Check if the user has ANY of the group permissions.
    for (let i = 0; i < group.length; i++) {
      if (user.permissions[group[i]]) {
        return true;
      }
    }
  }
}
