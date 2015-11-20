/*
  Generates paginated reducers.
*/
import _ from 'lodash';


export default function createPaginatedReducer(actions, key) {
   const initialState = {
    __persist: ['pages'],
    pages: {
      1: {
        [key]: [],
        hasNextPage: false,
        hasPrevPage: false,
        isFetching: false,
        page: 1
      }
    },
    searchQuery: ''
  };

  return function(state=initialState, action) {
    if (actions.SET_SEARCH_QUERY &&
        action.type === actions.SET_SEARCH_QUERY) {
      const newState = _.cloneDeep(state);
      newState.searchQuery = action.payload;
      return newState;
    }

    switch (action.type) {
      case actions.FETCH_BEGIN: {
        const newState = _.cloneDeep(state);
        const page = action.payload.page;

        newState.pages[page] = Object.assign({}, {
          [key]: [],
          hasNextPage: false,
          hasPrevPage: false,
          page: page
        }, newState.pages[page], {isFetching: true});

        return newState;
      }

      case actions.FETCH_OK: {
        /*
          Set objects.

          payload (object) --
            [key] - list of objects.
            hasPrevPage - whether there's a prev page.
            hasNextPage - whether there's a next page.
            page - page number.
        */
        const newState = _.cloneDeep(state);

        newState.pages[action.payload.page] = {
          [key]: action.payload[key],
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
