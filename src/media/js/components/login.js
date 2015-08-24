/*
    FxA login components.
*/
import classnames from 'classnames';
import React from 'react';
import Url from 'urlgray';


export class LoginButton extends React.Component {
  /* Opens FxA login popup window and receive authCode from postMessage. */
  static propTypes = {
    authUrl: React.PropTypes.string,
    content: React.PropTypes.any,
    isSignup: React.PropTypes.bool,
    loginBeginHandler: React.PropTypes.func,
    loginHandler: React.PropTypes.func.isRequired,
  };
  state = {
    loggingIn: false
  };
  handlePostMessage = msg => {
    const origins = [process.env.API_ROOT, window.location.origin];
    if (msg.data && msg.data.auth_code && origins.indexOf(msg.origin) !== -1) {
      // Got the auth code. Your duty is complete, login button.
      this.props.loginHandler(msg.data.auth_code);
    }
  }
  openPopup() {
    window.addEventListener('message', this.handlePostMessage);

    const authUrl = this.props.isSignup ?
                    Url(this.props.authUrl).q({signup: true}) :
                    this.props.authUrl;

    const w = 320;
    const h = 600;
    const x = window.screenX +
          Math.max(0, Math.floor((window.innerWidth - w) / 2));
    const y = window.screenY +
          Math.max(0, Math.floor((window.innerHeight - h) / 2));

    const popup = window.open(
      authUrl, 'fxa',
      `scrollbars=yes,width=${w},height=${h},left=${x},top=${y}`);

    return new Promise((resolve, reject) => {
      resolve(popup);
      const popupInterval = setInterval(() => {
        if (!popup || popup.closed) {
          // Popup closed, login cancelled.
          window.removeEventListener('message', this.handlePostMessage);
          clearInterval(popupInterval);
          reject(popup);
        }
      }, 500);
    });
  }
  startLogin = () => {
    this.setState({
      loggingIn: true
    });
    this.openPopup().then((popup) => {
      if (this.props.loginBeginHandler) {
        // loginBeginHandler generally used to store popup to close later.
        this.props.loginBeginHandler(popup);
      }
    }, () => {
      this.setState({
        loggingIn: false
      });
    });
  }
  render() {
    const btnClasses = classnames({
      login: true,
      ['login--register']: this.props.signup,
    });
    return <button className={btnClasses} onClick={this.startLogin}>
      {this.props.content || this.props.isSignup ? 'Register' : 'Login'}
    </button>;
  }
}
