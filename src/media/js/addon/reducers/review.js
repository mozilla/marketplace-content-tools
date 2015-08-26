import * as submitActions from '../actions/submit';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonReviewReducer(state=initialState, action) {
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
