import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const SiteConfigActions = {
  getSiteConfig() {
    const url = Url(urlJoin(process.env.MKT_API_ROOT,
                            'services/config/site/'))
                .q({serializer: 'commonplace'});

    return new Promise(resolve => {
        req
          .get(url)
          .then(res => {
            resolve(res.body)
          });
    });
  }
}
export default SiteConfigActions;
