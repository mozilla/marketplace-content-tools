'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_DASHBOARD__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const DELETE_OK = 'ADDON_DASHBOARD__DELETE_OK';
const deleteOk = createAction(DELETE_OK);


export function fetch(page=1) {
  /*
    Fetch user's add-ons.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const dashboardUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/')
    ).q(apiArgs).q({page});

    if (process.env.NODE_ENV === 'test') {
      // Mock data.
      const addonFactory = (
        require('../../__tests__/factory.test').addonFactory
      );
      return dispatch(fetchOk([
        addonFactory(),
        addonFactory({slug: 'test-addon-2'})
      ]));
    }

    req
      .get(dashboardUrl)
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


export function del(addonSlug) {
  /*
    Delete an add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const addonUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/', addonSlug,
              '/')
    ).q(apiArgs);

    req
      .del(addonUrl)
      .then(res => {
        dispatch(deleteOk(addonSlug));
      });
  };
}
