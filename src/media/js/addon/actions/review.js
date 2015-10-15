'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';

import * as notificationActions from '../../site/actions/notification';


export const FETCH_OK = 'ADDON_REVIEW__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

export const PUBLISH_OK = 'ADDON_REVIEW__PUBLISH_OK';
const publishOk = createAction(PUBLISH_OK);

export const PUBLISH_PENDING = 'ADDON_REVIEW__PUBLISH_PENDING';
const publishPending = createAction(PUBLISH_PENDING);

export const PUBLISH_ERROR = 'ADDON_REVIEW__PUBLISH_ERROR';
const publishError = createAction(PUBLISH_ERROR);

export const REJECT_OK = 'ADDON_REVIEW__REJECT_OK';
const rejectOk = createAction(REJECT_OK);

export const REJECT_PENDING = 'ADDON_REVIEW__REJECT_PENDING';
const rejectPending = createAction(REJECT_PENDING);

export const REJECT_ERROR = 'ADDON_REVIEW__REJECT_ERROR';
const rejectError = createAction(REJECT_ERROR);


export function fetch() {
  /* Fetch add-ons in the review queue. */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const queueUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/queue/')
    ).q(apiArgs);

    if (process.env.MOCK_DATA) {
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
      .get(queueUrl)
      .then((res, err) => {
        dispatch(fetchOk(res.body.objects));
      });
  };
}


export function publish(addonSlug, versionId, message) {
  /* Publish version of an add-on. */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const publishUrl = Url(
      urlJoin(
        process.env.MKT_API_ROOT,
        `extensions/extension/${addonSlug}/versions/${versionId}/publish/`
      )
    ).q(apiArgs);

    dispatch(publishPending({
      addonSlug,
      versionId
    }));
    req
      .post(publishUrl)
      .send({message: message})
      .set('Accept', 'application/json')
      .then(res => {
        dispatch(publishOk({
          addonSlug,
          versionId
        }));
        dispatch(notificationActions.queue(
          `${addonSlug} has been successfully approved.`, 'success'));
      }, err => {
        dispatch(publishError({
          addonSlug,
          versionId
        }));
        dispatch(notificationActions.queue(
          `Sorry, there was an error publishing ${addonSlug}.`, 'error'));
      });
  };
}


export function reject(addonSlug, versionId, message) {
  /* Reject version of an add-on. */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const rejectUrl = Url(
      urlJoin(
        process.env.MKT_API_ROOT,
        `extensions/extension/${addonSlug}/versions/${versionId}/reject/`
      )
    ).q(apiArgs);

    dispatch(rejectPending({
      addonSlug,
      versionId
    }));
    req
      .post(rejectUrl)
      .send({message: message})
      .set('Accept', 'application/json')
      .then(res => {
        dispatch(rejectOk({
          addonSlug,
          versionId
        }));
        dispatch(notificationActions.queue(
          `${addonSlug} has been successfully rejected.`));
      }, err => {
        dispatch(rejectError({
          addonSlug,
          versionId
        }));
        dispatch(notificationActions.queue(
          `Sorry, there was an error rejecting ${addonSlug}.`, 'error'));
      });
  };
}
