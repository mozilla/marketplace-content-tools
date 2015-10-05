/*
  Add-on validation and submission actions.

  1. Upload a ZIP, get a validation ID.
  2. Poll the validation API using the given ID to get processing status.
  3. Once validation passes, ping the API with the validation ID to create the
     add-on and finish the submission process.
*/
'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';

import * as notificationActions from '../../site/actions/notification';


export const VALIDATION_BEGIN = 'ADDON_SUBMIT__VALIDATION_BEGIN';
const validationBegin = createAction(VALIDATION_BEGIN);

export const UPLOAD_PROGRESS = 'ADDON_SUBMIT__UPLOAD_PROGRESS';
const uploadProgress = createAction(UPLOAD_PROGRESS);

// For when the add-on upload has started processing.
export const VALIDATION_PENDING = 'ADDON_SUBMIT__VALIDATION_PENDING';
const validationPending = createAction(VALIDATION_PENDING);

// For when the add-on upload has finished validation.
export const VALIDATION_PASS = 'ADDON_SUBMIT__VALIDATION_PASS';
const validationPassed = createAction(VALIDATION_PASS);

export const VALIDATION_FAIL = 'ADDON_SUBMIT__VALIDATION_FAIL';
const validationFail = createAction(VALIDATION_FAIL);

export const SUBMIT_OK = 'ADDON_SUBMIT__SUBMIT_OK';
const submitOk = createAction(SUBMIT_OK);

export const SUBMIT_ERROR = 'ADDON_SUBMIT__SUBMIT_ERROR';
const submitError = createAction(SUBMIT_ERROR);

export const MESSAGE_CHANGE = 'ADDON_SUBMIT__MESSAGE_CHANGE';
export const messageChange = createAction(MESSAGE_CHANGE);


export function submit(fileData) {
  /*
    Upload add-on .zip file for validation.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const validationUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/validation/')
    ).q(apiArgs);

    dispatch(validationBegin());

    req
      .post(validationUrl)
      .set('Content-Type', 'application/zip')
      .set('Content-Disposition',
           'form-data; name="binary_data"; filename="extension.zip"')
      .send(fileData)
      .on('progress', e => {
        // Keep track of upload progress.
        dispatch(uploadProgress({
          // e.percent is also available, but we can math.
          uploadLoaded: e.loaded,
          uploadTotal: e.total
        }))
      })
      .then(res => {
        // Notify the reducers.
        dispatch(validationPending(res.body.id));

        // Take further action by polling.
        dispatch(pollValidator(res.body.id));
      }, err => {
        dispatch(validationFail(JSON.parse(err.response.text).detail));
        _validationErrorNotification(dispatch);
      });
  };
}


export function pollValidator(validationId) {
  /*
    Poll add-on's validation detail endpoint to wait until validation has
    processed.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const pollUrl = Url(
      urlJoin(process.env.MKT_API_ROOT,
              `extensions/validation/${validationId}/`)
    ).q(apiArgs);

    let pollValidatorInterval;

    function poll(interval) {
      req
        .get(pollUrl)
        .then(res => {
          if (res.body.processed) {
            // If processed, then validation is complete. Resolve process.
            clearInterval(pollValidatorInterval);

            if (res.body.valid) {
              dispatch(create());
            } else {
              dispatch(validationFail(res.body.validation));
            }
          }
        });
    }

    // Poll the validator, poll() will clear interval when complete + dispatch.
    pollValidatorInterval = setInterval(() => {
      poll(pollValidatorInterval);
    }, 500);
  };
}


export function create() {
  /*
    Finish add-on submission process.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const createUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/')
    ).q(apiArgs);

    req
      .post(createUrl)
      .send({
        message: getState().addonSubmit.message,
        validation_id: getState().addonSubmit.validationId
      })
      .then(res => {
        dispatch(submitOk(res.body));
        dispatch(notificationActions.queue(
          'Your Firefox OS Add-on has been successfully submitted!',
          'success'));
      }, err => {
        dispatch(validationFail(JSON.parse(err.response.text).detail));
        _validationErrorNotification(dispatch);
      });
  };
}


function _validationErrorNotification(dispatch) {
  dispatch(notificationActions.queue(
    'Sorry, we found an error with your Firefox OS Add-on.', 'error'));
}
