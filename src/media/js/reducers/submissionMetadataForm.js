/*
    Reducer for the Metadata form of Submission.
*/
import * as submissionActions from '../actions/submission';
import * as submissionMetadataActions from '../actions/submissionMetadataForm';


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


export default function submissionMetadataFormReducer(state=initialState,
                                                      action) {
  switch (action.type) {
    case submissionActions.SUBMIT_URL_OK: {
      const data = action.payload;
      return Object.assign({}, state, {
        canonical_url: data.metadata.canonical_url,
        description: data.metadata.description,
        detected_icon: data.metadata.icon,
        name: data.metadata.name,
        url: data.url
      });
    }

    case submissionMetadataActions.SET_FORM_DATA: {
      return Object.assign({}, state, action.payload);
    }

    case submissionMetadataActions.SUBMIT_METADATA_OK: {
      return initialState
    }

    default: {
      return state;
    }
  }
}
