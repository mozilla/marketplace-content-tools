'use strict';
import {createAction} from 'redux-actions';
import urlJoin from 'url-join';

import generateFetchAction from './addonListing';


export const FETCH_BEGIN = 'ADDON_REVIEW_UPDATES__FETCH_BEGIN';
const fetchBegin = createAction(FETCH_BEGIN);

export const FETCH_OK = 'ADDON_REVIEW_UPDATES__FETCH_OK';
const fetchOk = createAction(FETCH_OK);


export const fetch = generateFetchAction(
  fetchBegin, fetchOk,
  urlJoin(process.env.MKT_API_ROOT, 'extensions/queue/updates/'));
