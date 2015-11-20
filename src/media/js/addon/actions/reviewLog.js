'use strict';
import {createAction} from 'redux-actions';
import urlJoin from 'url-join';
import Url from 'urlgray';

import generatePaginatedFetchAction from './utils/pagination';


export const FETCH_BEGIN = 'ADDON_REVIEW_LOG__FETCH_BEGIN';
const fetchBegin = createAction(FETCH_BEGIN);

export const FETCH_OK = 'ADDON_REVIEW_LOG__FETCH_OK';
const fetchOk = createAction(FETCH_OK);

const notesUrl = Url(
 urlJoin(process.env.MKT_API_ROOT, 'comm/notes/')
).q({doc_type: 'extension', ordering: '-created'});

export const fetch = generatePaginatedFetchAction(
  fetchBegin, fetchOk, notesUrl, 'notes', [], 'addonReviewLog');

export const SET_SEARCH_QUERY = 'ADDON_REVIEW_LOG__SET_SEARCH_QUERY';
export const setSearchQuery = createAction(SET_SEARCH_QUERY);
