/*
    Reducer for the Website metadata form step of Website Submission.
*/
import * as submissionWebsiteActions from '../actions/submissionWebsite';
import * as submissionWebsiteUrlActions from '../actions/submissionWebsiteUrl';


const initialState = {
  meta: {
    persist: true
  },
  canonical_url: '',
  categories: [],
  description: '',
  detected_icon: '',
  keywords: '',
  name: '',
  preferred_regions: [],
  public_credit: true,
  why_relevant: '',
  worldwide: true,
  works_well: ''
};


export default function submissionWebsite(state=initialState, action) {
  switch (action.type) {
    case submissionWebsiteUrlActions.SUBMIT_URL_OK: {
      const data = action.payload;
      return Object.assign({}, state, {
        canonical_url: data.metadata.canonical_url,
        description: data.metadata.description,
        detected_icon: data.metadata.icon,
        name: data.metadata.name,
        url: data.url
      });
    }

    case submissionWebsiteActions.SET_FORM_DATA: {
      return Object.assign({}, state, action.payload);
    }

    case submissionWebsiteActions.SUBMIT_METADATA_OK: {
      return initialState
    }

    default: {
      return state;
    }
  }
}
