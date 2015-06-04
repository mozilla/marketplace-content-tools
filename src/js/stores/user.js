import {Store} from 'flummox';


export default class UserStore extends Store {
  constructor(flux) {
    super();

    const loginActionIds = flux.getActionIds('login');
    this.register(loginActionIds.login, this.handleLogin);

    this.state = {};
  }
  handleLogin(userData) {
    this.setState(userData);
  }
}
