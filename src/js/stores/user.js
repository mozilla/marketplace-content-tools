import LocalStore from 'flummox-localstore';


export default class UserStore extends LocalStore {
  constructor(flux) {
    super(flux);

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleLogin);
  }
  handleLogin(userData) {
    this.setState(userData);
  }
}
