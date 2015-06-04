import FluxComponent from 'flummox/component';
import fluxMixin from 'flummox/mixin';
import React from 'react';
import Url from 'urlgray';


let LoginButton = React.createClass({
  render() {
    return <FluxComponent connectToStores={['siteConfig']}>
      <FxaLoginButton signup={this.props.signup}/>
    </FluxComponent>
  }
});
export {LoginButton as LoginButton};


let LoginHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [fluxMixin(['siteConfig'])],
  componentDidMount() {
    const {router} = this.context;
    this.props.flux.getActions('login').login(window.location.href,
                                              router.getCurrentQuery().state,
                                              this.state.localDevClientId);
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


let FxaLoginButton = React.createClass({
  // Props: [clientId, authUrl, authState].
  getInitialState() {
    return {
      loggingIn: false
    };
  },
  componentDidMount() {
    if (this.props.signup) {
      this.setProps({
        authUrl: Url(this.props.authUrl).q({action: 'signup'})
      });
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
