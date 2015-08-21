/*
  FxA login action creators.
*/
import {createAction} from 'redux-actions';
import urlJoin from 'url-join';
import Url from 'urlgray';

import req from '../request';


export const FXA_LOGIN_BEGIN = 'LOGIN__FXA_LOGIN_BEGIN';
export const fxaLoginBegin = createAction(FXA_LOGIN_BEGIN);

export const LOGIN_BEGIN = 'LOGIN__LOGIN_BEGIN';
const loginBegin = createAction(LOGIN_BEGIN);

export const LOGIN_OK = 'LOGIN__LOGIN_OK';
export const loginOk = createAction(LOGIN_OK);

export const LOGOUT_BEGIN = 'LOGIN__LOGOUT_BEGIN';
const logoutBegin = createAction(LOGOUT_BEGIN);

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
    dispatch(loginBegin(data));

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

  return (dispatch, getState) => {
    dispatch(logoutBegin());

    const apiArgs = getState().apiArgs || {};

    // Post logout data to server to clear session.
    req
      .del(Url(url).q(apiArgs))
      .then(() => {
        dispatch(logoutOk());
      });
  };
}
