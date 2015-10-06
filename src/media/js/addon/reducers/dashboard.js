/*
  Add-ons in the user dashboard, paginated, and keyed by slug.
*/
import _ from 'lodash';

import * as dashboardActions from '../actions/dashboard';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
  pages: {
    1: {
      addons: [],
      hasNextPage: false,
    }
  }
};


export default function addonDashboardReducer(state=initialState, action) {
  switch (action.type) {
    case dashboardActions.FETCH_OK: {
      /*
        Set dashboards add-ons.

        payload (object) --
          addons - list of add-ons.
          hasNextPage - whether there's a next page.
          page - page number.
      */
      const newState = _.cloneDeep(state);

      newState.pages[action.payload.page] = {
        addons: action.payload.addons,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}
