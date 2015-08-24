import React from 'react';
import {connect} from 'react-redux';


export function loginRequired(Component, LoginHandler, group) {
  /* Wraps a handler component to require login.
     Subscribes to the user store such that it will automatically
     "redirect" to the page after successful login. */
  @connect(
    state => ({user: state.user})
  )
  class AuthenticatedComponent extends React.Component {
    render() {
      if (process.env.NODE_ENV === 'test' ||
          _checkPermissions(this.props.user, group)) {
        return <Component/>
      } else {
        // Redirect to LoginHandler if not logged in or no permission.
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
