'use strict';
import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const FETCH_THREAD_OK = 'ADDON_COMM__FETCH_THREAD_OK';
const fetchThreadOk = createAction(FETCH_THREAD_OK);


export function fetchThreads(addonSlug) {
  /*
    Fetch list of thread IDs for add-on.
  */
  return (dispatch, getState) => {
    const apiArgs = getState().apiArgs || {};
    const threadListUrl = Url(
      urlJoin(process.env.MKT_API_ROOT, 'comm/extension/', addonSlug)
    ).q(apiArgs);

    req
      .get(threadListUrl)
      .then((res, err) => {
        res.body.objects.forEach(thread => {
          // Fetch threads one-by-one.
          let threadNotesUrl = Url(
            urlJoin(process.env.MKT_API_ROOT, 'comm/thread/', thread.id,
                    'note/')
          ).q(apiArgs);

          req
            .get(threadNotesUrl)
            .then((res, err) => {
              dispatch(fetchThreadOk({
                addonSlug,
                notes: res.body.objects,
                versionId: thread.version.id
              }));
            });
        });
      });
  };
}
