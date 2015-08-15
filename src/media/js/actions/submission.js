'use strict';
import {createAction} from 'redux-actions';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export const SUBMIT_URL_BEGIN = 'SUBMISSION__SUBMIT_URL_BEGIN';
const submitUrlBegin = createAction(SUBMIT_URL_BEGIN);

export const SUBMIT_URL_OK = 'SUBMISSION__SUBMIT_URL_OK';
const submitUrlOk = createAction(SUBMIT_URL_OK);

export const GO_TO_STEP = 'SUBMISSION__GO_TO_STEP';
export const goToStep = createAction(GO_TO_STEP);


export function submitUrl(url) {
  // Fetch mobile-friendly data and metadata to prepopulate form.
  return dispatch => {
    dispatch(submitUrlBegin());

    Promise.all([_getMobileFriendlyData(url), _getMetadata(url)])
      .then(results => {
        let mobileFriendlyData;
        let metadata;
        [mobileFriendlyData, metadata] = results;

        dispatch(submitUrlOk({
          metadata: metadata,
          mobileFriendlyData: mobileFriendlyData,
          url: url
        }));
      });
  }
}


export function _getMobileFriendlyData(url) {
  // Analyze submitted URL with Google Webmaster mobileReady.
  const analyzerUrl = Url(
    'https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady'
  ).q({
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

export function _getMetadata(url) {
  // Get website metadata with Zamboni website scraper.
  const scrapeUrl = Url(
    urlJoin(process.env.MKT_API_ROOT, 'websites/scrape')
  ).q({url: url});
  return new Promise(resolve => {
    req
      .get(scrapeUrl)
      .then(res => {
        console.log('Scrape Results', res.body);
        resolve(res.body);
      });
  });
}
