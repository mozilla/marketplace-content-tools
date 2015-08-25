/*
  Holds add-ons submitted by the user, keyed by slug.
*/
import * as addonDashboardActions from '../actions/addonDashboard';
import * as submissionAddonActions from '../actions/submissionAddon';


const initialState = {
  __persist: true
};


export default function addonDashboardReducer(state=initialState, action) {
  switch (action.type) {
    case addonDashboardActions.FETCH_OK: {
      const newState = Object.assign({}, state);
      action.payload.forEach(addon => {
        newState[addon.slug] = addon;
      });
      return newState;
    }

    case submissionAddonActions.SUBMIT_OK: {
      const newState = Object.assign({}, state);
      newState[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
