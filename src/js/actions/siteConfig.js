import {Actions} from 'flummox';
import req from 'superagent-bluebird-promise';
import Url from 'urlgray';
import urlJoin from 'url-join';


export default class SiteConfigActions extends Actions {
  async getSiteConfig() {
    const url = Url(urlJoin(process.env.MKT_API_ROOT,
                            '/api/v2/services/config/site/'))
                .q({serializer: 'commonplace'});

    return await new Promise(resolve => {
        req
          .get(url)
          .then(res => {
            resolve(res.body)
          });
    });
  }
}
