import {Actions} from 'flummox';
import urlJoin from 'url-join';

import req from '../request';


export default class LoginActions extends Actions {
  loggedIn(data) {
    // Notify that app is logged in on startup through localStorage.
    return data;
  }
  startLogin(popup) {
    return popup;
  }
  login(authResponse, authState, clientId) {
    let data = {
      auth_response: authResponse,
      state: authState,
    }
    if (clientId) {
      data.client_id = clientId;
    }

    return this.serverLogin(data);
  }
  logout() {
    // Post logout data to server.
    const url = urlJoin(process.env.MKT_API_ROOT, 'account/logout/')

    req
      .del(url)
      .then();

    return {};
  }
  serverLogin(data) {
    // Post login data to server.
    const url = urlJoin(process.env.MKT_API_ROOT,
                        'account/fxa-login/');

    return new Promise(resolve => {
        req
          .post(url)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(data)
          .then(res => {
            resolve(res.body)
          });
    });
  }
}
