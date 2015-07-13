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
  hasPermission(group) {
    if (!this.isLoggedIn()) {
      return false;
    }

    if (!group) {
      // If no group is specified, then simply return true.
      return true;
    }
    if (group.constructor === String && this.state.permissions[group]) {
      // Check if the user has the group permission.
      return true;
    } else if (group.constructor === Array) {
      // Check if the user has ANY of the group permissions.
      for (var i = 0; i < group.length; i++) {
        if (this.state.permissions[group[i]]) {
          return true;
        }
      }
    }
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
