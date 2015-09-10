'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_OK = 'ADDON_DASHBOARD__FETCH_OK';
const fetchOk = createAction(FETCH_OK);


export function fetch() {
  /*
    Fetch user's add-ons.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const dashboardUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'extensions/extension/')
    ).q(apiArgs);

    if (process.env.NODE_ENV === 'test') {
      // Mock data.
      const addonFactory = (
        require('../../__tests__/factory.test').addonFactory
      );
      return dispatch(fetchOk([
        addonFactory(),
        addonFactory({slug: 'test-addon-2'})
      ]));
    }

    req
      .get(dashboardUrl)
      .then((res, err) => {
        dispatch(fetchOk(res.body.objects));
      });
  };
}
