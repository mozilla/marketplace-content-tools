/*
    Reducer for Firefox OS add-ons validation and submission process.
*/
import * as submissionAddonActions from '../actions/submissionAddon';


const initialState = {
  validationErrorMsg: '',
  validationId: '',
};


export default function submissionAddon(state=initialState, action) {
  switch (action.type) {
    case submissionAddonActions.VALIDATION_PENDING: {
      return Object.assign({}, state, {
        validationId: action.payload,
      });
    }

    case submissionAddonActions.VALIDATION_FAIL: {
      return Object.assign({}, state, {
        validationErrorMsg: action.payload,
      });
    }

    case submissionAddonActions.SUBMIT_OK: {
      // Reset once an add-on submission is complete.
      return initialState;
    }

    default: {
      return state;
    }
  }
}
