import * as reviewActions from '../actions/review';
import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
};


export default function addonReviewReducer(state=initialState, action) {
  switch (action.type) {
    case reviewActions.FETCH_OK: {
      let addons = {};
      action.payload.forEach(addon => {
        addons[addon.slug] = addon;
      });
      return {...{}, ...state, ...addons};
    }

    case submitActions.SUBMIT_OK: {
      const newState = Object.assign({}, state);
      newState[action.payload.slug] = action.payload;
      return newState;
    }

    default : {
      return state;
    }
  }
}
