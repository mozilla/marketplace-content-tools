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

    case reviewActions.PUBLISH_PENDING: {
      const newState = Object.assign({}, state);
      newState[action.payload].isPublishing = true;
      return newState;
    }

    case reviewActions.PUBLISH: {
      const newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    }

    case reviewActions.PUBLISH_ERROR: {
      const newState = Object.assign({}, state);
      newState[action.payload].isPublishing = false;
      return newState;
    }

    case reviewActions.REJECT_PENDING: {
      const newState = Object.assign({}, state);
      newState[action.payload].isRejecting = true;
      return newState;
    }

    case reviewActions.REJECT: {
      const newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    }

    case reviewActions.REJECT_ERROR: {
      const newState = Object.assign({}, state);
      newState[action.payload].isRejecting = false;
      return newState;
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
