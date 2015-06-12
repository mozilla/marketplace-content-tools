import LocalStore from 'flummox-localstore';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export default class SiteConfigStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      serializer: state => {
        return {
          switches: state.switches
        };
      }
    });

    const siteConfigActions = flux.getActions('siteConfig');
    this.register(siteConfigActions.getSiteConfig, this.handleGetSiteConfig);

    this.state.localDevClientId = this.getLocalDevClientId();

  }
  handleGetSiteConfig(siteConfig) {
    this.setState({
      authUrl: this.addLocalDevClientId(siteConfig.fxa.fxa_auth_url),
      authState: siteConfig.fxa.fxa_auth_state,
      switches: siteConfig.switches
    });
  }
  getAuthInfo(isSignup) {
    var authUrl = Url(this.state.authUrl || '');
    if (isSignup) {
      authUrl = authUrl.q({action: 'signup'});
    }
    return {
      authUrl: authUrl,
      authState: this.state.authState,
      localDevClientId: this.state.localDevClientId
    }
  }
  addLocalDevClientId(authUrl) {
    var localDevClientId = this.getLocalDevClientId();
    if (localDevClientId) {
        return Url(authUrl).q({client_id: localDevClientId});
    }
    return authUrl;
  }
  getLocalDevClientId(origin) {
    var clientIds = {
      'http://localhost:8675': '124ae9dff020ba79',
      'http://localhost:8676': '31b549f7dfb4de69',
      'http://localhost:8677': 'cc389d4ccd6cd34d',
      'http://localhost:8678': '47354b86fb361c7e',
      'http://localhost:8679': '049d4b105daa1cb9',
      'http://localhost:8680': '8822419fecd26a6c',
    };
    return clientIds[origin || window.location.origin];
  }
}


export default SiteConfigStore
