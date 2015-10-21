'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';

import generateFetchAction from './addonListing';
import * as notificationActions from '../../site/actions/notification';


export const FETCH_BEGIN = 'ADDON_DASHBOARD__FETCH_BEGIN';
const fetchBegin = createAction(FETCH_BEGIN);

export const FETCH_OK = 'ADDON_DASHBOARD__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const DELETE_OK = 'ADDON_DASHBOARD__DELETE_OK';
const deleteOk = createAction(DELETE_OK);


export const fetch = generateFetchAction(
  fetchBegin, fetchOk,
  urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/'));


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
