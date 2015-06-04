import {Store} from 'flummox';


export default class UserStore extends Store {
  constructor(flux) {
    super();

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleLogin);

    this.state = JSON.parse(localStorage.getItem('userStore')) || {};
  }
  handleLogin(userData) {
    this.setState(userData);
    localStorage.setItem('userStore', JSON.stringify(userData));
  }
}
