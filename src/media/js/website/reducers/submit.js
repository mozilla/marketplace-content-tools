/*
    Reducer for the Website metadata form step of Website Submission.
*/
import * as submitActions from '../actions/submit';
import * as submitUrlActions from '../actions/submitUrl';


const initialState = {
  __persist: true,
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


export default function websiteSubmitReducer(state=initialState, action) {
  switch (action.type) {
    case submitUrlActions.SUBMIT_URL_OK: {
      const data = action.payload;
      return Object.assign({}, state, {
        canonical_url: data.metadata.canonical_url,
        description: data.metadata.description,
        detected_icon: data.metadata.icon,
        name: data.metadata.name,
        url: data.url
      });
    }

    case submitActions.SET_FORM_DATA: {
      return Object.assign({}, state, action.payload);
    }

    case submitActions.SUBMIT_METADATA_OK: {
      return initialState
    }

    default: {
      return state;
    }
  }
}
