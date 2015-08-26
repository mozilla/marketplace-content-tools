'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_REVIEW__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const PUBLISH = 'ADDON_REVIEW__PUBLISH_OK';
const publishOk = createAction(PUBLISH);

export const PUBLISH_PENDING = 'ADDON_REVIEW__PUBLISH_PENDING';
const publishPending = createAction(PUBLISH_PENDING);

export const PUBLISH_ERROR = 'ADDON_REVIEW__PUBLISH_ERROR';
const publishError = createAction(PUBLISH_ERROR);

export const REJECT = 'ADDON_REVIEW__REJECT_OK';
const rejectOk = createAction(REJECT);

export const REJECT_PENDING = 'ADDON_REVIEW__REJECT_PENDING';
const rejectPending = createAction(REJECT_PENDING);

export const REJECT_ERROR = 'ADDON_REVIEW__REJECT_ERROR';
const rejectError = createAction(REJECT_ERROR);


export function fetch() {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const queueUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/queue/')
    ).q(apiArgs);

    req
      .get(queueUrl)
      .then((res, err) => {
        dispatch(fetchOk(res.body.objects));
      });
  };
}


export function publish(slug) {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const publishUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, `extensions/queue/${slug}/publish/`)
    ).q(apiArgs);

    dispatch(publishPending(slug));
    req
      .post(publishUrl)
      .then((res, err) => {
        if (res.status >= 400) {
          dispatch(publishError(slug));
        } else {
          dispatch(publishOk(slug));
        }
      });
  };
}


export function reject(slug) {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const rejectUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, `extensions/queue/${slug}/reject/`)
    ).q(apiArgs);

    dispatch(rejectPending(slug));
    req
      .post(rejectUrl)
      .then((res, err) => {
        if (res.status >= 400) {
          dispatch(rejectError(slug));
        } else {
          dispatch(rejectOk(slug));
        }
      });
  };
}
