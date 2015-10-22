/*
  Reducer generator for paginated add-on listings.
*/
import _ from 'lodash';


const initialState = {
  __persist: true,
  pages: {
    1: {
      addons: [],
      hasNextPage: false,
      hasPrevPage: false,
      isFetching: false,
      page: 1
    }
  }
};


export default function createAddonListingReducer(actions) {
  return function(state=initialState, action) {
    switch (action.type) {
      case actions.FETCH_BEGIN: {
        const newState = _.cloneDeep(state);
        const page = action.payload.page;

        newState.pages[page] = Object.assign({}, {
          addons: [],
          hasNextPage: false,
          hasPrevPage: false,
          page: page
        }, newState.pages[page], {isFetching: true});

        return newState;
      }

      case actions.FETCH_OK: {
        /*
          Set add-ons.

          payload (object) --
            addons - list of add-ons.
            hasPrevPage - whether there's a prev page.
            hasNextPage - whether there's a next page.
            page - page number.
        */
        const newState = _.cloneDeep(state);

        newState.pages[action.payload.page] = {
          addons: action.payload.addons,
          hasNextPage: action.payload.hasNextPage,
          hasPrevPage: action.payload.hasPrevPage,
          isFetching: false,
          page: action.payload.page,
        };

        return newState;
      }

      default: {
        return state;
      }
    }
  };
}
