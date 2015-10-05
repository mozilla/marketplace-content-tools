import {createAction} from 'redux-actions';
import req from 'request';
import urlJoin from 'url-join';
import Url from 'urlgray';

export const TOS_GET_BEGIN = 'TOS_GET__BEGIN';
export const tosGetBegin = createAction(TOS_GET_BEGIN);

export const TOS_GET_OK = 'TOS_GET__OK';
export const tosGetOk = createAction(TOS_GET_OK);

export const TOS_SIGN_BEGIN = 'TOS_SIGN__BEGIN';
export const tosSignBegin = createAction(TOS_SIGN_BEGIN);

export const TOS_SIGN_OK = 'TOS_SIGN__OK';
export const tosSignOk = createAction(TOS_SIGN_OK);


export function getTOS() {
  return (dispatch, getState) => {
    dispatch(tosGetBegin());

    const tosUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'account/dev-agreement/show/')
    ).q(getState().apiArgs || {});

    return req
      .post(tosUrl)
      .then(res => {
        dispatch(tosGetOk(res.body));
      });
  };
}


export function signTOS() {
  return (dispatch, getState) => {
    dispatch(tosSignBegin());

    const tosUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'account/dev-agreement/read/')
    ).q(getState().apiArgs || {});

    return req
      .post(tosUrl)
      .then(res => {
        dispatch(tosSignOk());
      });
  };
}
