import {createAction} from 'redux-actions';
import req from 'request';
import Url from 'urlgray';
import urlJoin from 'url-join';


export const EDIT_SUBMISSION = 'REVIEW_WEBSITE_LISTING__EDIT_SUBMISSION';
export const editSubmission = createAction(EDIT_SUBMISSION);

export const FETCH_OK = 'REVIEW_WEBSITE_LISTING__FETCH_OK';
const fetchOk = createAction(FETCH_OK);


export function fetch() {
  return (dispatch, getState) => {
    if (process.env.NODE_ENV === 'test') {
      dispatch(fetchOk(_generateFakeWebsites()));
    } else {
      const apiArgs = getState().apiArgs || {};

      const submissionsListRoute = Url(
        urlJoin(process.env.MKT_API_ROOT, 'websites/submissions/')
      ).q(apiArgs);
      req
        .get(submissionsListRoute)
        .then(res => {
          dispatch(fetchOk(res.body.objects));
        });
    }
  };
}


function _generateFakeWebsites() {
  // Mock data.
  let submissions = [];
  for (let i = 0; i < 10; i++) {
    submissions.push({
      id: i,
      categories: ['games', 'books-comics'],
      description: `Fake submission ${i}.`,
      detected_icon: 'http://imgur.com/msW5XI3.jpg',
      keywords: ['fake', 'submission'],
      name: `Fake Submission ${i}`,
      preferred_regions: ['us', 'ca'],
      public_credit: true,
      submitter: 'kngo@mozilla.com',
      url: `http://xkcd.com/${i}/`,
      why_relevant: 'Because it is fake.',
      works_well: 4
    });
  }
  return submissions;
}
