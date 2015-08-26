import * as loginActions from '../actions/login';


const initialState = {
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

    default: {
      return state;
    }
  }
}
