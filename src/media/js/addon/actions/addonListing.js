/*
  Action creator creator for add-on listings.
*/
'use strict';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export default function generateFetchAction(fetchBegin, fetchOk, endpoint) {
  return function(page=1) {
    return (dispatch, getState) => {
      dispatch(fetchBegin({page}));

      const listingUrl= Url(endpoint).q(getState().apiArgs || {}).q({page});

      if (process.env.MOCK_DATA) {
        const addonFactory = (
          require('../../__tests__/factory.test').addonFactory
        );
        return dispatch(fetchOk({
          addons: [addonFactory(), addonFactory({slug: 'test-addon-2'})],
          hasPrevPage: false,
          hasNextPage: false,
          page
        }));
      }

      req
        .get(listingUrl)
        .then(res => {
          dispatch(fetchOk({
            addons: res.body.objects,
            hasPrevPage: !!res.body.meta.previous,
            hasNextPage: !!res.body.meta.next,
            page
          }));
        });
    };
  }
}
