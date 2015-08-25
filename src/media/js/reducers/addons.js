/*
  Holds add-ons, keyed by slug.
*/
import * as submissionAddonActions from '../actions/submissionAddon';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonReducer(state=initialState, action) {
  switch (action.type) {
    case submissionAddonActions.SUBMIT_OK: {
      const newState = Object.assign({}, state);
      newState.addons[action.payload.slug] = action.payload;
      return newState;
    }

    default : {
      return state;
    }
  }
}
