/*
  Holds website submissions, keyed by ID.
*/
import * as reviewWebsiteListingActions from '../actions/reviewWebsiteListing';


const initialState = {
  _meta: {
    persist: true
  }
};


export default function reviewWebsiteListingReducer(state=initialState,
                                                    action) {
  switch (action.type) {
    case reviewWebsiteListingActions.FETCH_OK: {
      let submissions = {};
      action.payload.forEach(submission => {
        submissions[submission.id] = submission;
      });
      return Object.assign({}, state, submissions);
    }

    case reviewWebsiteListingActions.EDIT_SUBMISSION: {
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
