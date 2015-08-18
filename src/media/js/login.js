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
      if (process.env.NODE_ENV === 'test' || this.props.user.token) {
        // TODO: calculate permissions based on user.
        return <Component/>
      } else {
        // Redirect to LoginHandler if not logged in or no permission.
        return <LoginHandler/>
      }
    }
  }
  return AuthenticatedComponent;
}
