/*
  Calling in dispatch.
*/
import {Flummox} from 'flummox';

import LoginActions from './actions/login';
import SiteConfigActions from './actions/siteConfig';
import SubmissionActions from './actions/submission';
import SubmissionMetadataFormActions from './actions/submissionMetadataForm';
import WebsiteSubmissionsActionsfrom './stores/websiteSubmissionsActions';

import ApiArgsStore from './stores/apiArgs';
import LoginStore from './stores/login';
import SiteConfigStore from './stores/siteConfig';
import SubmissionStore from './stores/submission';
import SubmissionMetadataFormStore from './stores/submissionMetadataForm';
import UserStore from './stores/user';
import WebsiteSubmissionsStore from './stores/websiteSubmissions';
import WizardStore from './stores/wizard';


export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('login', LoginActions);
    this.createActions('siteConfig', SiteConfigActions);
    this.createActions('submission', SubmissionActions);
    this.createActions('submissionMetadataForm',
                       SubmissionMetadataFormActions);
    this.createActions('websiteSubmissions', WebsiteSubmissionsActions);

    this.createStore('apiArgs', ApiArgsStore, this);
    this.createStore('login', LoginStore, this);
    this.createStore('siteConfig', SiteConfigStore, this);
    this.createStore('submission', SubmissionStore, this);
    this.createStore('submissionMetadataForm', SubmissionMetadataFormStore,
                     this);
    this.createStore('user', UserStore, this);
    this.createStore('websiteSubmissions', WebsiteSubmissionsStore, this);

    /* Initialize. */
    const siteConfigActions = this.getActions('siteConfig');
    siteConfigActions.getSiteConfig();

    const userStore = this.getStore('user');
    const loginActions = this.getActions('login');
    if (userStore.isLoggedIn()) {
      this.getActions('login').loggedIn(userStore.getUser());
    }
  }
}
