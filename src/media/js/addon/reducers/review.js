/*
  Review queue add-ons, keyed by slug.
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
      const newState = _.cloneDeep(state);
      newState.addons = {};  // Invalidate.

      action.payload.forEach(addon => {
        newState.addons[addon.slug] = addon;
      });

      return newState;
    }

    case reviewActions.PUBLISH_PENDING: {
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isPublishing = true;
      return newState;
    }

    case reviewActions.PUBLISH: {
      const newState = _.cloneDeep(state);
      delete newState.addons[action.payload];
      return newState;
    }

    case reviewActions.PUBLISH_ERROR: {
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isPublishing = false;
      return newState;
    }

    case reviewActions.REJECT_PENDING: {
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isRejecting = true;
      return newState;
    }

    case reviewActions.REJECT: {
      const newState = _.cloneDeep(state);
      delete newState.addons[action.payload];
      return newState;
    }

    case reviewActions.REJECT_ERROR: {
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isRejecting = false;
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      const newState = _.cloneDeep(state);
      newState.addons[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
