import {Store} from 'flummox';
import req from 'superagent-bluebird-promise';
import urlJoin from 'url-join';
import Url from 'urlgray';


export default class SiteConfigStore extends Store {
  constructor(flux) {
    super();
    var root = this;
    root.state = {
        localDevClientId: root.getLocalDevClientId(),
    };

    const url = Url(urlJoin(process.env.MKT_API_ROOT,
                            '/api/v2/services/config/site/'))
                    .q({serializer: 'commonplace'});

    req.get(url)
       .then(function(res) {
          root.setState({
            authUrl: root.addLocalDevClientId(res.body.fxa.fxa_auth_url),
            authState: res.body.fxa.fxa_auth_state,
            switches: res.body.switches
          });
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
