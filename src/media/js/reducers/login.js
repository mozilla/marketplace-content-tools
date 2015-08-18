/*
  Stores FxA login popup in state.
  Closes and removes it once Zamboni login is complete.
*/
import * as loginActions from '../actions/login';


export default function login(state={}, action) {
  switch (action.type) {
    case loginActions.FXA_LOGIN_BEGIN: {
      // Store login popup.
      return Object.assign({}, state, {
        popup: action.payload
      });
    }

    case loginActions.LOGIN_OK: {
      // Close login popup.
      if (state.popup) {
        state.popup.close();
      }

      let newState = Object.assign({}, state);
      delete newState.popup;
      return newState;
    }

    default: {
      return state;
    }
  }
}
