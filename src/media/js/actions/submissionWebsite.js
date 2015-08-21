'use strict';
import {createAction} from 'redux-actions';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export const SET_FORM_DATA = 'SUBMISSION_WEBSITE__SET_FORM_DATA';
export const setFormData = createAction(SET_FORM_DATA);

export const SUBMIT_WEBSITE_START = 'SUBMISSION_WEBSITE__SUBMIT_WEBSITE_START';
const submitWebsiteStart = createAction(SUBMIT_WEBSITE_START);

export const SUBMIT_WEBSITE_OK = 'SUBMISSION_WEBSITE__SUBMIT_WEBSITE_OK';
const submitWebsiteOk = createAction(SUBMIT_WEBSITE_OK);

export const SUBMIT_WEBSITE_ERR = 'SUBMISSION_WEBSITE__SUBMIT_WEBSITE_ERR';
const submitWebsiteErr = createAction(SUBMIT_WEBSITE_ERR);


export function submitWebsite(data, apiArgs) {
  // Submit website.
  const submitUrl = Url(
    urlJoin(process.env.MKT_API_ROOT, 'websites/submit/')
  ).q(apiArgs);

  return dispatch => {
     req
      .post(submitUrl)
      .send(data)
      .then((res, err) => {
        if (err) {
          dispatch(submitWebsiteErr(err));
        } else {
          dispatch(submitWebsiteOk(res));
        }
      });
  };
}
