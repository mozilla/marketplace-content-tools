import {createAction} from 'redux-actions';
import req from 'request';
import urlJoin from 'url-join';
import Url from 'urlgray';


export const TOS_BEGIN = 'TOS__BEGIN';
export const tosBegin = createAction(TOS_BEGIN);

export const TOS_OK = 'TOS__OK';
export const tosOk = createAction(TOS_OK);


export function signTOS() {
  return (dispatch, getState) => {
    dispatch(tosBegin());

    const tosUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'account/devtos/')
    ).q(getState().apiArgs || {});

    return req
      .post(tosUrl)
      .then(res => {
        dispatch(tosOk());
      });
  };
}
