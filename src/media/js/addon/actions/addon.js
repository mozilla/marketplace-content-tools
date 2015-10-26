'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_ADDON__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const FETCH_VERSIONS_OK = 'ADDON_ADDON__FETCH_VERSIONS_OK';
const fetchVersionsOk = createAction(FETCH_VERSIONS_OK);

export const BLOCK_STATUS_CHANGE_BEGIN =
  'ADDON_ADDON__BLOCK_STATUS_CHANGE_BEGIN';
const blockStatusChangeBegin = createAction(BLOCK_STATUS_CHANGE_BEGIN);

export const BLOCK_STATUS_CHANGE_OK =
  'ADDON_ADDON__BLOCK_STATUS_CHANGE_OK';
const blockStatusChangeOk = createAction(BLOCK_STATUS_CHANGE_OK);


export function fetch(addonSlug) {
  /*
    Fetch add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const addonUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/', addonSlug)
    ).q(apiArgs);

    if (process.env.MOCK_DATA) {
      // Mock data.
      const addonFactory = (
        require('../../__tests__/factory.test').addonFactory
      );
      return dispatch(fetchOk(addonFactory()));
    }

    req
      .get(addonUrl)
      .then(res => {
        dispatch(fetchOk(res.body));
      });
  };
}


export function fetchVersions(addonSlug) {
  /*
    Fetch versions of an add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const versionsUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/', addonSlug,
              'versions/')
    ).q(apiArgs);

    if (process.env.MOCK_DATA) {
      const versionsFactory = (
        require('../../__tests__/factory.test').versionsFactory
      );
      return dispatch(fetchVersionsOk({
        addonSlug,
        versions: versionsFactory()
      }));
    }

    req
      .get(versionsUrl)
      .then(res => {
        dispatch(fetchVersionsOk({
          addonSlug,
          versions: res.body.objects
        }));
      });
  };
}


/**
 * Block add-on.
 *
 * @param {string} addonSlug
 */
export function block(addonSlug) {
  return (dispatch, getState) => {
    dispatch(blockStatusChangeBegin(addonSlug));

    const blockUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension', addonSlug,
              'block/')
    ).q(getState().apiArgs || {});

    req
      .post(blockUrl)
      .then(res => {
        dispatch(blockStatusChangeOk(addonSlug));
        dispatch(fetch(addonSlug));
      }, err => {
        dispatch(blockStatusChangeOk(addonSlug));
      });
  };
}


/**
 * Unblock add-on.
 *
 * @param {string} addonSlug
 */
export function unblock(addonSlug) {
  return (dispatch, getState) => {
    dispatch(blockStatusChangeBegin(addonSlug));

    const unblockUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension', addonSlug,
              'unblock/')
    ).q(getState().apiArgs || {});

    req
      .post(unblockUrl)
      .then(res => {
        dispatch(blockStatusChangeOk(addonSlug));
        dispatch(fetch(addonSlug));
      }, err => {
        dispatch(blockStatusChangeOk(addonSlug));
      });
  };
}
