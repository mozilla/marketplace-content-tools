/*
  Reducer for add-on validation and submission process.

  Also used for add-on version validation and submission. We have a helper
  function that takes an action module to generate a reducer. Add-on actions
  and add-on version actions dispatch the same actions, but with slightly
  different action types. Thus, we need to differentiate them.
*/
import * as submitActions from '../actions/submit';
import * as submitVersionActions from '../actions/submitVersion';


const initialState = {
  isSubmitting: false,
  uploadLoaded: null,
  uploadTotal: null,
  validationErrorMessage: '',
  validationId: '',
};


function createAddonSubmitReducer(actions) {
  return function(state=initialState, action) {
    switch (action.type) {
      case actions.VALIDATION_BEGIN: {
        /*
          Validation and submission process begin.
        */
        return Object.assign({}, initialState, {
          isSubmitting: true
        });
      }

      case actions.UPLOAD_PROGRESS: {
        /*
          Add-on upload progress.

          payload (object) --
            uploadLoaded (number) -- bytes loaded.
            uploadTotal (number) -- total bytes to load.
        */
        return Object.assign({}, state, action.payload);
      }

      case actions.VALIDATION_PENDING: {
        /*
          Validation and submission process begin.

          payload (number) -- pending validation ID.
        */
        return Object.assign({}, state, {
          validationId: action.payload,
        });
      }

      case actions.VALIDATION_FAIL: {
        /*
          Validation error.

          payload (string) -- error message.
        */
        return Object.assign({}, state, {
          isSubmitting: false,
          validationErrorMessage: action.payload,
        });
      }

      case actions.SUBMIT_ERROR: {
        /*
          Submit error.

          payload (string) -- error message.
        */
        return Object.assign({}, state, {
          isSubmitting: false,
          validationErrorMessage: action.payload,
        });
      }

      case actions.SUBMIT_OK: {
        /*
          Reset once an add-on submission is complete.
        */
        return initialState;
      }

      default: {
        return state;
      }
    }
  }
}


export const addonSubmitReducer = createAddonSubmitReducer(
  submitActions);
export const addonSubmitVersionReducer = createAddonSubmitReducer(
  submitVersionActions);
