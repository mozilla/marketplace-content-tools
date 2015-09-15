/*
  User's add-ons, keyed by slug.
*/
import _ from 'lodash';

import * as addonActions from '../actions/addon';
import * as dashboardActions from '../actions/dashboard';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonDashboardReducer(state=initialState, action) {
  switch (action.type) {
    case addonActions.FETCH_OK: {
      /* Store single add-on. */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload.slug] = Object.assign(
        {}, newState.addons[action.payload.slug], action.payload
      );
      return newState;
    }

    case addonActions.FETCH_VERSIONS_OK: {
      // Attach versions to their respective addon.
      const newState = _.cloneDeep(state);

      // Create add-on if it doesn't exist, just in case.
      if (!newState.addons[action.payload.addonSlug]) {
        newState.addons[action.payload.addonSlug] = {};
      }

      // Store as an object keyed by version ID for easier lookups.
      const addon = newState.addons[action.payload.addonSlug];
      addon.versions = {};
      action.payload.versions.forEach(version => {
        addon.versions[version.id] = version;
      });
      return newState;
    }

    case dashboardActions.FETCH_OK: {
      /* Set dashboards add-ons. */
      const newState = _.cloneDeep(state);
      newState.addons = {};  // Invalidate.
      // Set new add-ons.
      action.payload.forEach(addon => {
        newState.addons[addon.slug] = addon;
      });
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      /* Add add-on to dashboard after submit. */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload.slug] = action.payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
