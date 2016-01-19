/*
  Action creator creator for add-on listings.
*/
'use strict';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


/**
 * Generates a fetch action that works with the pagination system.
 *
 * @param {function} fetchBegin
 * @param {function} fetchOk
 * @param {string} endpoint
 * @param {string} key - Name of the key to dispatch the objects on.
 * @param {array} mockObjs - What to return in mock mode.
 */
export default function generateFetchAction(fetchBegin, fetchOk, endpoint, key,
                                            mockObjs, reducerName) {
  return function(page=1) {
    return (dispatch, getState) => {
      const state = getState();
      let fetchUrl = Url(endpoint).q(state.apiArgs || {}).q({page});

      if (reducerName && state[reducerName].searchQuery) {
        fetchUrl = fetchUrl.q({
          q: state[reducerName].searchQuery
        });
      }

      dispatch(fetchBegin({page}));

      if (process.env.MOCK_DATA && mockObjs) {
        return dispatch(fetchOk({
          [key]: mockObjs,
          hasPrevPage: false,
          hasNextPage: false,
          page
        }));
      }

      const offset = page * 15;

      req
        .get(fetchUrl.url)
        .then(res => {
          dispatch(fetchOk({
            [key]: res.body.objects,
            hasPrevPage: !!res.body.meta.previous,
            hasNextPage: !!res.body.meta.next,
            offset,
            page
          }));
        });
    };
  }
}
