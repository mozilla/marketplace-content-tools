import _ from 'lodash';

import * as searchActions from '../actions/search';


const initialState = {
  q: null,
  results: []
};


export default function searchReducer(state=initialState, action) {
  switch (action.type) {
    case searchActions.REVIEWER_SEARCH_OK: {
      /*
        Store results.

        payload (object) --
          q (string)
          results (array)
      */
      const newState = _.cloneDeep(state);
      newState.q = action.payload.q;
      newState.results = action.payload.results;
      return newState;
    }

    default: {
      return state;
    }
  }
}
