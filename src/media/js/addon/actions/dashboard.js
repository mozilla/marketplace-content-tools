'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';

import * as notificationActions from '../../site/actions/notification';


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
        dispatch(notificationActions.queue(
          'Your Firefox OS Add-on has been successfully deleted.'));
      });
  };
}
