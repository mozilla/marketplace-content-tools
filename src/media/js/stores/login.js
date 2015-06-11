import {Store} from 'flummox';


export default class Login extends Store {
  constructor(flux) {
    super();

    const loginActions = flux.getActionIds('login');
    this.register(loginActions.startLogin, this.handleStartLogin);
    this.register(loginActions.login, this.handleLogin);

    this.state = {};
  }
  handleStartLogin(popup) {
    // Store login popup.
    this.setState({
      popup: popup
    });
  }
  handleLogin() {
    // Close login popup.
    if (this.state.popup) {
      this.state.popup.close();
    }
  }
}
