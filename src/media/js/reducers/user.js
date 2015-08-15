import * as loginActions from '../actions/login';


const initialState = {};


export default function userReducer(state=initialState, action) {
  switch (action.type) {
    case loginActions.LOGIN_OK: {
      return Object.assign({}, action.payload);
    }
    case loginActions.LOGOUT_OK: {
      return initialState;
    }
  }
}
