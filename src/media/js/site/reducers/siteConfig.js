import Url from 'urlgray';

import * as siteConfigActions from '../actions/siteConfig';


export const initialState = {
  __persist: true,
  authState: '',
  authUrl: '',
  clientId: getLocalDevClientId(),
  switches: []
}


export default function siteConfigReducer(state=initialState, action) {
  switch (action.type) {
    case siteConfigActions.FETCH_OK: {
      const siteConfig = action.payload;

      // Add client ID parameter.
      let authUrl = siteConfig.fxa.fxa_auth_url;
      if (state.clientId) {
        authUrl = Url(authUrl).q({client_id: state.clientId});
      }

      return Object.assign({}, state, {
        authUrl: authUrl.toString(),
        authState: action.payload.fxa.fxa_auth_state,
        switches: action.payload.switches
      });
    }

    default: {
      return state;
    }
  }
}


export function getLocalDevClientId(origin) {
  const clientIds = {
    'http://localhost:8675': '124ae9dff020ba79',
    'http://localhost:8676': '31b549f7dfb4de69',
    'http://localhost:8677': 'cc389d4ccd6cd34d',
    'http://localhost:8678': '47354b86fb361c7e',
    'http://localhost:8679': '049d4b105daa1cb9',
    'http://localhost:8680': '8822419fecd26a6c',
  };
  return clientIds[origin || window.location.origin];
}
