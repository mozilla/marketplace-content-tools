import {Actions} from 'flummox';
import req from 'superagent-bluebird-promise';
import Url from 'urlgray';
import urlJoin from 'url-join';


export default class SubmissionActions extends Actions {
  async analyzeSite(url) {
    const analyzerUrl = Url('https://www.googleapis.com/pagespeedonline/' +
                            'v3beta1/mobileReady').q({
      key: 'AIzaSyDkEX-f1JNLQLC164SZaobALqFv4PHV-kA',
      url: url
    });

    return await new Promise(resolve => {
      req
        .get(analyzerUrl)
        .then(res => {
          resolve(res.body);
        });
    });
  }
}
