/*
  Add-ons in the user dashboard, keyed by slug.
*/
import _ from 'lodash';

import * as dashboardActions from '../actions/dashboard';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonDashboardReducer(state=initialState, action) {
  switch (action.type) {
    case dashboardActions.FETCH_OK: {
      /*
        Set dashboards add-ons.

        payload (array) -- add-ons.
      */
      const newState = _.cloneDeep(state);
      newState.addons = {};  // Invalidate.
      // Set new add-ons.
      action.payload.forEach(addon => {
        newState.addons[addon.slug] = addon;
      });
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      /*
        Add add-on to dashboard after submit.

        payload (object) -- add-on.
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
