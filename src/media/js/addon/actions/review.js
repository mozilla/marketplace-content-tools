'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_REVIEW__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const PUBLISH = 'ADDON_REVIEW__PUBLISH_OK';
const publishOk = createAction(PUBLISH);


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


export function publish(slug) {
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const publishUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, `extensions/queue/${slug}/publish/`)
    ).q(apiArgs);

    req
      .post(publishUrl)
      .then((res, err) => {
        dispatch(publishOk(slug));
      });
  };
}
