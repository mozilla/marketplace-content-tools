import LocalStore from 'flummox-localstore';


export default class UserStore extends LocalStore {
  constructor(flux) {
    super(flux, {key: 'UserStore'});

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleLogin);
    this.register(loginActionIds.logout, this.handleLogout);
  }
  handleLogin(userData) {
    this.setState(userData);
  }
  handleLogout() {
    this.replaceState({});
  }
  isLoggedIn() {
    return !!this.state.token;
  }
  getDisplayName() {
    if (this.isLoggedIn()) {
      return this.state.settings.display_name;
    }
  }
  getEmail() {
    if (this.isLoggedIn()) {
      return this.state.settings.email
    }
  }
  getUser() {
    return this.state;
  }
}
