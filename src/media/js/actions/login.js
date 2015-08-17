/*
  FxA login action creators.
*/
import {createAction} from 'redux-actions';
import urlJoin from 'url-join';

import req from '../request';


export const FXA_LOGIN_START = 'LOGIN__FXA_LOGIN_START';
export const fxaLoginStart = createAction(FXA_LOGIN_START);

export const LOGIN_START = 'LOGIN__LOGIN_START';
const loginStart = createAction(LOGIN_START);

export const LOGIN_OK = 'LOGIN__LOGIN_OK';
export const loginOk = createAction(LOGIN_OK);

export const LOGOUT_START = 'LOGIN__LOGOUT_START';
const logoutStart = createAction(LOGOUT_START);

export const LOGOUT_OK = 'LOGIN__LOGOUT_OK';
const logoutOk = createAction(LOGOUT_OK);


export function login(authResponse, authState, clientId) {
  // Asynchronous login action creator.
  // Dispatched after user has authed thru FxA, but not yet authed with Mkt.
  let data = {
    auth_response: authResponse,
    state: authState,
  }
  if (clientId) {
    data.client_id = clientId;
  }

  return dispatch => {
    dispatch(loginStart(data));

    // Post login data to server to get user data and auth token.
    const url = urlJoin(process.env.MKT_API_ROOT, 'account/fxa-login/');
    return req
      .post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(data)
      .then(res => {
        dispatch(loginOk(res.body));
      });
  };
}


export function logout() {
  // Asynchronous logout action creator.
  // Tells Zamboni we are logged out.
  const url = urlJoin(process.env.MKT_API_ROOT, 'account/logout/')

  return dispatch => {
    dispatch(logoutStart());

    // Post logout data to server to clear session.
    req
      .del(url)
      .then(() => {
        dispatch(logoutOk());
      });
  };
}
