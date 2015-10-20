import * as loginActions from '../actions/login';
import * as tosActions from '../actions/tos';


export const initialState = {
  __persist: true,
  settings: {},
  token: process.env.MOCK_DATA ? 'mocktoken' : null,
  tos: {
    has_signed: process.env.MOCK_DATA
  },
};


export default function userReducer(state=initialState, action) {
  switch (action.type) {
    case loginActions.LOGIN_OK: {
      /*
        Log in.

        payload (object) --
          apps (object)
          permissions (object)
          settings (object)
          token (string)
      */
      // Sync with Fireplace.
      localStorage.setItem('0::permissions',
                           JSON.stringify(action.payload.permissions));
      localStorage.setItem('0::settings',
                           JSON.stringify(action.payload.settings));
      localStorage.setItem('0::user', action.payload.token);
      localStorage.setItem('0::user_apps',
                           JSON.stringify(action.payload.apps));

      return Object.assign({}, state, action.payload);
    }

    case loginActions.LOGOUT_OK: {
      // Sync with Fireplace.
      localStorage.removeItem('0::user');

      return initialState;
    }

    case tosActions.TOS_GET_OK: {
      let newState = Object.assign({}, state);
      newState.tos.url = action.payload.url;
      return newState;
    }

    case tosActions.TOS_SIGN_BEGIN: {
      let newState = Object.assign({}, state);
      newState.tos.signing = true;
      return newState;
    }

    case tosActions.TOS_SIGN_OK: {
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
