import {createAction} from 'redux-actions';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


export const EDIT_SUBMISSION = createAction('WEBSITE__EDIT_SUBMISSION');
export const editSubmission = createAction(EDIT_SUBMISSION);

export const FETCH_SUBMISSIONS_OK = createAction(
  'WEBSITE__FETCH_SUBMISSIONS_OK');
export const fetchSubmissionsOk = createAction(FETCH_SUBMISSIONS_OK);


export function fetch(apiArgs) {
  return dispatch => {
    if (process.env.NODE_ENV === 'test') {
      dispatch(fetchWebsiteSubmissionsOk(_generateFakeWebsiteSubmissions()));
    } else {
      const submissionsListRoute = Url(
        urlJoin(process.env.MKT_API_ROOT, 'websites/submissions/')
      ).q(apiArgs);
      req
        .get(submissionsListRoute)
        .then(res => {
          dispatch(fetchSubmissionsOk(res.body.objects));
        });
    }
  };
}


function _generateFakeWebsiteSubmissions() {
  // Mock data.
  let submissions = [];
  for (let i = 0; i < 10; i++) {
    submissions.push({
      id: i,
      categories: ['games', 'books-comics'],
      description: `Fake submission ${i}.`,
      keywords: ['fake', 'submission'],
      icon: 'http://imgur.com/msW5XI3.jpg',
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
