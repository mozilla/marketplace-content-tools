import createAddonListingReducer from './addonListing';
import * as reviewUpdatesActions from '../actions/reviewUpdates';


export default createAddonListingReducer(reviewUpdatesActions);
