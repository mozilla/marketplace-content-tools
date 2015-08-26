/*
  Holds add-ons submitted by the user, keyed by slug.
*/
import * as dashboardActions from '../actions/dashboard';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true
};


export default function addonDashboardReducer(state=initialState, action) {
  switch (action.type) {
    case dashboardActions.FETCH_OK: {
      const newState = Object.assign({}, state);
      action.payload.forEach(addon => {
        newState[addon.slug] = addon;
      });
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      const newState = Object.assign({}, state);
      newState[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
