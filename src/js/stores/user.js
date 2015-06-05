import LocalStore from 'flummox-localstore';


export default class UserStore extends LocalStore {
  constructor(flux) {
    super(flux);

    if (this.state.token) {
      flux.getActions('login').loggedIn(this.state);
    }

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleLogin);
  }
  handleLogin(userData) {
    this.setState(userData);
  }
}
