import {Flummox} from 'flummox';

import SiteConfigStore from './stores/siteConfig';


export default class Flux extends Flummox {
  constructor() {
    super();

    this.createStore('siteConfig', SiteConfigStore, this);
  }
}
