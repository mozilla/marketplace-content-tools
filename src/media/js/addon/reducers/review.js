/*
  Add-ons in the review queue, keyed by slug.
*/
import _ from 'lodash';

import * as reviewActions from '../actions/review';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonReviewReducer(state=initialState, action) {
  switch (action.type) {
    case reviewActions.FETCH_OK: {
      // Store add-ons from the review queue.
      const newState = _.cloneDeep(state);
      newState.addons = {};  // Invalidate old queue.

      action.payload.forEach(addon => {
        newState.addons[addon.slug] = addon;
      });
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      // Add new submission to the review queue.
      const newState = _.cloneDeep(state);

      newState.addons[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
