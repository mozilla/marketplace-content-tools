import * as loginActions from '../actions/login';
import * as tosActions from '../actions/tos';


export const initialState = {
  __persist: true,
  settings: {}
};


export default function userReducer(state=initialState, action) {
  switch (action.type) {
    case loginActions.LOGIN_OK: {
      return Object.assign({}, state, action.payload);
    }

    case loginActions.LOGOUT_OK: {
      return initialState;
    }

    case tosActions.TOS_BEGIN: {
      let newState = Object.assign({}, state);
      newState.tos.signing = true;
      return newState;
    }

    case tosActions.TOS_OK: {
      let newState = Object.assign({}, state);
      newState.tos.signing = false;
      newState.tos.has_signed = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
