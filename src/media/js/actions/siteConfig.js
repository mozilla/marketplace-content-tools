import {createAction} from 'redux-actions';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export const FETCH_OK = 'SITE_CONFIG__FETCH_OK';
const fetchOk = createAction(FETCH_OK);


export function fetch() {
  const url = Url(
    urlJoin(process.env.MKT_API_ROOT, 'services/config/site/')
  ).q({serializer: 'commonplace'});

  return dispatch => {
    req
      .get(url)
      .then(res => {
        dispatch(fetchOk(res.body));
      });
  }
}
