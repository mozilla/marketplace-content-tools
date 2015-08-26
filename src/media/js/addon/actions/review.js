'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_REVIEW__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const APPROVE = 'ADDON_REVIEW__APPROVE_OK';
const approveOk = createAction(APPROVE);


export function fetch() {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const queueUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/queue/')
    ).q(apiArgs);

    req
      .get(queueUrl)
      .then((res, err) => {
        // Take further action by polling.
        dispatch(fetchOk(res.body.objects));
      });
  };
}


export function approve(slug) {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const approveUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, `extensions/queue/${slug}/approve`)
    ).q(apiArgs);

    req
      .post(approveUrl)
      .then((res, err) => {
        dispatch(approveOk(slug));
      });
  };
}