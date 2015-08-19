/*
    Holds website submissions, keyed by ID.
*/
import * as websiteSubmissionActions from '../actions/websiteSubmissions';


const initialState = {};


export default function websiteSubmissionsReducer(state=initialState, action) {
  switch (action.type) {
    case websiteSubmissionActions.FETCH_SUBMISSIONS_OK: {
      let submissions = {};
      action.payload.forEach(submission => {
        submissions[submission.id] = submission;
      });
      return Object.assign({}, state, submissions);
    }

    case websiteSubmissionActions.EDIT_SUBMISSION: {
      const newState = Object.assign({}, state);

      const submissionData = action.payload;
      newState[submissionData.id] = {...newState[submissionData.id],
                                     ...submissionData};

      return newState;
    }

    default : {
      return state;
    }
  }
}
