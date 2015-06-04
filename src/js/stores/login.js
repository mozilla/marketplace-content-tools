import {Store} from 'flummox';


export default class Login extends Store {
  constructor(flux) {
    super();

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.startLogin, this.handleStartLogin);
    this.register(loginActionIds.login, this.handleLogin);

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
