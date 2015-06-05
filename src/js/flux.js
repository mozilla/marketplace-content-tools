import {Flummox} from 'flummox';

import LoginActions from './actions/login';
import SiteConfigActions from './actions/siteConfig';
import WizardActions from './actions/wizard';

import ApiArgsStore from './stores/apiArgs';
import LoginStore from './stores/login';
import SiteConfigStore from './stores/siteConfig';
import UserStore from './stores/user';
import WizardStore from './stores/wizard';


export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('login', LoginActions);
    this.createActions('siteConfig', SiteConfigActions);
    this.createActions('wizard', WizardActions);

    this.createStore('apiArgs', ApiArgsStore, this);
    this.createStore('login', LoginStore, this);
    this.createStore('siteConfig', SiteConfigStore, this);
    this.createStore('user', UserStore, this);
    this.createStore('wizard', WizardStore, this);
  }
}
