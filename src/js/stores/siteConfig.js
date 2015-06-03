import {Store} from 'flummox';
import req from 'superagent-bluebird-promise';
import urlJoin from 'url-join';
import Url from 'urlgray';


export default class SiteConfigStore extends Store {
  constructor(flux) {
    super();
    var root = this;
    root.state = {};

    const url = Url(urlJoin(process.env.MKT_API_ROOT,
                            '/api/v2/services/config/site/'))
                    .q({serializer: 'commonplace'});

    req.get(url)
       .then(function(res) {
          root.setState({
            authUrl: res.body.fxa.fxa_auth_url,
            authState: res.body.fxa.fxa_auth_state,
            switches: res.body.switches
          });
        });
  }
}


export default SiteConfigStore
