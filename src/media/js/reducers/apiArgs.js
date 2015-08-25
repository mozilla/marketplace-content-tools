import Url from 'urlgray';

import * as loginActions from '../actions/login';


const qs = Url._parseQuery(window.location.href);
const lang = qs.lang ||
             (navigator.l10n && navigator.l10n.language) ||
             navigator.language ||
             navigator.userLanguage ||
             'en-US';
let initialState = {
  lang: lang,
  region: qs.region || 'restofworld',
};
if (qs.carrier) {
  initialState.carrier = qs.carrier;
}

export default function apiArgs(state=initialState, action) {
  switch (action.type) {
    case loginActions.LOGIN_OK: {
      // User data available. Set new apiArgs based on user data.
      let newState = {};
      const user = action.payload;

      // Shared secret auth token.
      if (user.token) {
        newState._user = user.token;
      }

      // Region.
      const region = user.settings.region_override ||
                     user.settings.region_sim ||
                     user.settings.region_geoip;
      if (region) {
        newState.region = region;
      }

      // Carrier.
      const carrier = user.settings.carrier_override ||
                      user.settings.carrier_sim;
      if (carrier) {
        newState.carrier = carrier;
      }

      return {...state, ...newState};
    }

    case loginActions.LOGOUT_OK: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
