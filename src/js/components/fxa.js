import React from 'react';

import Url from 'urlgray';


let FxaLoginButton = React.createClass({
  // Props: [clientId, authUrl, authState].
  getInitialState() {
    return {
      loggingIn: false
    };
  },
  componentDidMount() {
    window.addEventListener('message', this.handleLogin);

    if (this.props.signup) {
      this.setProps({
        authUrl: Url(this.props.authUrl).q({action: 'signup'})
      });
    }
  },
  componentWillUnmount() {
    window.removeEventListener('message', this.handleLogin);
  },
  handleLogin(msg) {
    console.log(msg);
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

    return new Promise((resolve) => {
      const popupInterval = setInterval(() => {
        if (popup || popup.closed) {
          clearInterval(popupInterval);
          resolve(popup);
        }
      }, 500);
    });
  },
  startLogin() {
    var root = this;
    root.setState({
      loggingIn: true
    });
    root.openPopup().then(() => {
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
