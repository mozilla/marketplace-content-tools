'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';

import * as notificationActions from '../../site/actions/notification';


export const FETCH_OK = 'ADDON_VERSION__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const DELETE_BEGIN = 'ADDON_VERSION__DELETE_BEGIN';
const deleteBegin = createAction(DELETE_BEGIN);

export const DELETE_ERROR = 'ADDON_VERSION__DELETE_ERROR';
const deleteError  = createAction(DELETE_ERROR);

export const DELETE_OK = 'ADDON_VERSION__DELETE_OK';
const deleteOk = createAction(DELETE_OK);


export function fetch(slug) {
  /*
    Fetch versions of an add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const dashboardUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/')
    ).q(apiArgs);

    req
      .get(dashboardUrl)
      .then(res => {
        dispatch(fetchOk(res.body.objects));
      });
  };
}


export function del(addonSlug, versionId) {
  /*
    Delete a version of an add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const versionUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/', addonSlug,
              'versions', versionId, '/')
    ).q(apiArgs);

    dispatch(deleteBegin({
      addonSlug,
      versionId,
    }));

    req
      .del(versionUrl)
      .then(res => {
        dispatch(deleteOk({
          addonSlug,
          versionId,
        }));
        dispatch(notificationActions.queue(
          'Firefox OS Add-on version successfully deleted.'));
      }, err => {
        dispatch(deleteError({
          addonSlug,
          versionId,
        }));
        if (err.forbidden) {
          dispatch(notificationActions.queue(
            'Sorry, you do not have permission to delete this version'),
            'error');
        }
      });
  };
}
