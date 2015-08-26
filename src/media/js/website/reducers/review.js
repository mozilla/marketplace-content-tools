/*
  Holds website submissions, keyed by ID.
*/
import * as reviewActions from '../actions/review';


const initialState = {
  __persist: true
};


export default function websiteReviewReducer(state=initialState, action) {
  switch (action.type) {
    case reviewActions.FETCH_OK: {
      let submissions = {};
      action.payload.forEach(submission => {
        submissions[submission.id] = submission;
      });
      return Object.assign({}, state, submissions);
    }

    case reviewActions.EDIT_SUBMISSION: {
      const newState = Object.assign({}, state);

      const submissionData = action.payload;
      newState[submissionData.id] = {...newState[submissionData.id],
                                     ...submissionData};

      return newState;
    }

    default: {
      return state;
    }
  }
}
