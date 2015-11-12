/*
  Reducer generator for paginated add-on listings.
*/
import generatePaginatedReducer from './utils/pagination';


export default function createAddonListingReducer(actions) {
  return generatePaginatedReducer(actions, 'addons');
}
