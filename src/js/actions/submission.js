import {Actions} from 'flummox';
import req from 'superagent-bluebird-promise';
import Url from 'urlgray';
import urlJoin from 'url-join';


export default class SubmissionActions extends Actions {
  async submitUrl(url) {
    // Analyze submitted URL with Google Webmaster mobileReady.
    const analyzerUrl = Url('https://www.googleapis.com/pagespeedonline/' +
                            'v3beta1/mobileReady').q({
      key: 'AIzaSyDkEX-f1JNLQLC164SZaobALqFv4PHV-kA',
      screenshot: true,
      url: url
    });

    return await new Promise(resolve => {
      req
        .get(analyzerUrl)
        .then(res => {
          console.log('Google Webmaster MobileReady Results', res.body);
          resolve({
            url: url,
            mobileReady: res.body
          });
        });
    });
  }
  goToNextStep() {
    return {};
  }
  goToPrevStep() {
    return {};
  }
  goToStep(num) {
    return num;
  }
}
