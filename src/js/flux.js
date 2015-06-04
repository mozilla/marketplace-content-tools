import {Flummox} from 'flummox';

import LoginActions from './actions/login';
import LoginStore from './stores/login';
import SiteConfigStore from './stores/siteConfig';
import UserStore from './stores/user';


export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('login', LoginActions);

    this.createStore('login', LoginStore, this);
    this.createStore('siteConfig', SiteConfigStore, this);
    this.createStore('user', UserStore, this);
  }
}
