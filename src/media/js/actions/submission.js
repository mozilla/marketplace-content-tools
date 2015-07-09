'use strict';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const SubmissionActions = {
  submitUrl(url) {
    // Step 1: get mobile-friendly data and metadata to prepopulate form.
    return new Promise(resolve => {
      Promise.all([this.getMobileFriendlyData(url), this.getMetadata(url)])
        .then(results => {
          let mobileFriendlyData;
          let metadata;
          [mobileFriendlyData, metadata] = results;
          resolve({
            metadata: metadata,
            mobileFriendlyData: mobileFriendlyData,
            url: url
          });
        });
    });
  },
  getMetadata(url) {
    const scrapeUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'websites/scrape')).q({url: url});

    return new Promise(resolve => {
      req
        .get(scrapeUrl)
        .then(res => {
          console.log('Scrape Results', res.body);
          resolve(res.body);
        });
    });
  },
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
  },
  goToStep(num) {
    return num;
  }
};
export default SubmissionActions;
