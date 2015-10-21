'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const REVIEWER_SEARCH_OK = 'ADDON__REVIEWER_SEARCH_OK';
const reviewerSearchOk = createAction(REVIEWER_SEARCH_OK);


export function reviewerSearch(q) {
  /*
    Search (for reviewers).
  */
  return (dispatch, getState) => {
    const reviewerSearchUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/search/reviewers/')
    ).q(getState().apiArgs || {}).q({q, limit: 25});

    if (process.env.MOCK_DATA) {
      // Mock data.
      var addonFactory = require('../../__tests__/factory.test').addonFactory;
      return dispatch(reviewerSearchOk({
        q,
        results: [addonFactory(), addonFactory(), addonFactory()]
      }));
    }

    req
      .get(reviewerSearchUrl)
      .then(res => {
        dispatch(reviewerSearchOk({
          q,
          results: res.body.objects
        }));
      });
  };
}
