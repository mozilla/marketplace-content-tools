'use strict';
import {Actions} from 'flummox';
import req from 'superagent-bluebird-promise';
import Url from 'urlgray';
import urlJoin from 'url-join';


export default class SubmissionActions extends Actions {
  async submitUrl(url) {
    // Get mobile-friendly data and metadata.
    return await new Promise(resolve => {
      Promise.all([this.getMobileFriendlyData(url), this.getMetadata(url)])
        .then(results => {
          [mobileFriendlyData, metadata] = results;
          resolve({
            mobileFriendlyData: mobileFriendlyData,
            url: url
          });
        });
    });
  }
  getMetadata(url) {
    // TODO: scrape metadata from site.
    return new Promise(resolve => {
      resolve();
    });
  }
  getMobileFriendlyData(url) {
    // Analyze submitted URL with Google Webmaster mobileReady.
    const analyzerUrl = Url('https://www.googleapis.com/pagespeedonline/' +
                            'v3beta1/mobileReady').q({
      key: 'AIzaSyDkEX-f1JNLQLC164SZaobALqFv4PHV-kA',
      screenshot: true,
      url: url
    });

    return new Promise(resolve => {
      req
        .get(analyzerUrl)
        .then(res => {
          console.log('Google Mobile-Friendly Results', res.body);
          resolve(res.body);
        });
    });
  }
  goToStep(num) {
    return num;
  }
}
