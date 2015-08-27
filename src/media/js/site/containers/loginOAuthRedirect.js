import React from 'react';


export default class LoginOAuthRedirectHandler extends React.Component {
  /*
    After login, FxA OAuth redirects to this handler which is within a popup.
    Retrieves the auth info from the URL and postmessage back to opener.
    Note this handler is currently not used in production, but rather
    Fireplace's /fxa-authorize handler, but it'll work since every app will
    be proxied onto the same domain.
  */
  constructor() {
    super();
    if (this.isPopup()) {
      // `auth_code` to match the legacy Commonplace key.
      window.opener.postMessage({auth_code: window.location.href},
                                window.location.origin);
    }
  }
  isPopup() {
    try {
        if (window.opener.location.protocol == window.location.protocol &&
            window.opener.location.host == window.location.host) {
          return true;
        }
    } catch (e) {
      return false;
    }
  }
  render() {
    return (
      <div className="fullscreen">
        <h2>Logging you in...</h2>
      </div>
    );
  }
}
