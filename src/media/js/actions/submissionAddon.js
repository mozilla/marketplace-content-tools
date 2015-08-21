'use strict';
import {createAction} from 'redux-actions';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export const VALIDAITON_BEGIN = 'SUBMISSION_ADDON__VALIDAITON_BEGIN';
const validationBegin = createAction(VALIDAITON_BEGIN);

// For when the add-on upload is in process of validation.
export const VALIDAITON_PENDING = 'SUBMISSION_ADDON__VALIDAITON_PENDING';
const validationPending = createAction(VALIDAITON_PENDING);

// For when the add-on upload has finished validation.
export const VALIDAITON_PROCESSED = 'SUBMISSION_ADDON__VALIDAITON_PROCESSED';
const validationProcessed = createAction(VALIDAITON_PROCESSED);



export function validate(data) {
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
      .post(validation)
      .set('Content-Type', 'application/zip')
      .set('Content-Disposition',
           'form-data; name="binary_data"; filename="extension.zip"')
      .send(data)
      .then((res, err) => {
        if (res.statusCode === 201) {
          dispatch(validationProcessed());
        } else if (res.statusCode === 202) {
          dispatch(validationPending());
        } else {
        }
      });
  };
}
