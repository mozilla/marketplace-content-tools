/*
  Action creator creator for add-on listings.
*/
'use strict';
import generatePaginatedFetchAction from './utils/pagination';
import {addonFactory} from '../../__tests__/factory.test';


export default function generateFetchAction(fetchBegin, fetchOk, endpoint) {
  return generatePaginatedFetchAction(
    fetchBegin, fetchOk, endpoint, 'addons',
    [addonFactory(), addonFactory({slug: 'test-addon-2'})]);
}
