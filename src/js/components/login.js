/*
    FxA Login component.

    Involved in the process is the Login action, the Login store, and User
    store.
*/
import FluxComponent from 'flummox/component';
import fluxMixin from 'flummox/mixin';
import React from 'react';
import Url from 'urlgray';


let LoginHandler = React.createClass({
  /* After login, FxA OAuth redirects to this handler which is within a popup.
     Retrieves the auth info from the URL and postmessage back to opener.
     Note this handler is currently not used in production, but rather
     Fireplace's /fxa-authorize handler, but it'll work since every app will
     be proxied onto the same domain.
  */
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [fluxMixin(['siteConfig'])],
  componentDidMount() {
    const {router} = this.context;

    if (this.isPopup()) {
      // `auth_code` to match the legacy Commonplace key.
      window.opener.postMessage({auth_code: window.location.href},
                                window.location.origin);
    }
  },
  isPopup() {
    try {
        if (window.opener.location.protocol == window.location.protocol &&
            window.opener.location.host == window.location.host) {
          return true;
        }
    } catch (e) {
      return false;
    }
  },
  render() {
    return <h1>Processing Firefox Accounts authorization&hellip;</h1>
  }
});
export {LoginHandler as LoginHandler};


let LoginButton = React.createClass({
  // Wrapper around FxA login button to connect to Marketplace's API.
  getAuthUrl() {
    var url = Url(this.state.authUrl);
    if (this.props.signup) {
      return url.q({action: 'signup'});
    }
  },
  render() {
    return <FluxComponent
              connectToStores={{siteConfig: store => store.getAuthInfo()}}>
      <FxaLoginButton signup={this.props.signup}/>
    </FluxComponent>
  }
});
export {LoginButton as LoginButton};


let FxaLoginButton = React.createClass({
  // Opens up an FxA login popup window.
  // Props: [clientId, authUrl, authState].
  getInitialState() {
    return {
      loggingIn: false
    };
  },
  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  },
  componentWillUnmount() {
    window.removeEventListener('message', this.handlePostMessage);
  },
  handlePostMessage(msg) {
    var origins = [process.env.API_ROOT, window.location.origin];
    if (msg.data && msg.data.auth_code && origins.indexOf(msg.origin) !== -1) {
        // Trigger Login action.
        this.props.flux.getActions('login').login(
            msg.data.auth_code, this.props.authState,
            this.props.localDevClientId);
    }
  },
  openPopup() {
    const w = this.props.popupWidth || 320;
    const h = this.props.popupHeight || 600;
    const x = window.screenX +
          Math.max(0, Math.floor((window.innerWidth - w) / 2));
    const y = window.screenY +
          Math.max(0, Math.floor((window.innerHeight - h) / 2));

    const popup = window.open(
      this.props.authUrl, 'fxa',
      `scrollbars=yes,width=${w},height=${h},left=${x},top=${y}`);

    return new Promise((resolve, reject) => {
      resolve(popup);
      const popupInterval = setInterval(() => {
        if (!popup || popup.closed) {
          // Popup closed, login cancelled.
          clearInterval(popupInterval);
          reject(popup);
        }
      }, 500);
    });
  },
  startLogin() {
    const root = this;
    root.setState({
      loggingIn: true
    });
    root.openPopup().then((popup) => {
      this.props.flux.getActions('login').startLogin(popup);
    }, () => {
      root.setState({
        loggingIn: false
      });
    });
  },
  render() {
    return <button onClick={this.startLogin}>
      {this.props.content || 'Login'}
    </button>;
  }
});
export {FxaLoginButton as FxaLoginButton};
