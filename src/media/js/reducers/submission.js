import * as submissionActions from '../actions/submission';


const initialState = {
  activeStep: 0,
  highestStep: 0,
  isLoading: false,
  mobileFriendlyData: {},
  successfullySubmittedUrl: null,
  url: null,
};


export default function submissionReducer(state=initialState, action) {
  switch (action.type) {
    case submissionActions.SUBMIT_URL_BEGIN: {
      // Called when action for submitting a URL begins.
      return Object.assign({}, state, {
        isLoading: true
      });
    }

    case submissionActions.SUBMIT_URL_OK: {
      // Don't continue if not mobile-friendly.
      const mobileFriendlyData = action.payload.mobileFriendlyData;
      const isMobileFriendly = mobileFriendlyData.ruleGroups.USABILITY.pass;
      const activeStep = isMobileFriendly ? state.activeStep + 1 :
                                            state.activeStep;

      return Object.assign({}, state, {
        activeStep: activeStep,
        highestStep: activeStep,  // Reset highest step.
        isLoading: false,
        mobileFriendlyData: {
          isMobileFriendly: isMobileFriendly,
          screenshot: _formatScreenshot(mobileFriendlyData.screenshot)
        },
        successfullySubmittedUrl: null,
        url: action.payload.url
      });
    }

    case submissionActions.SUBMIT_METADATA_OK: {
      // Website successfully submitted. Reset the state.
      return Object.assign({}, initialState, {
        successfullySubmittedUrl: state.url
      });
    }

    case submissionActions.GO_TO_STEP: {
      const newStep = action.payload;

      let highestStep = state.highestStep;
      if (newStep > state.highestStep) {
        highestStep = state.activeStep;
      }

      return Object.assign({}, state, {
        activeStep: newStep,
        highestStep: highestStep,
      });
    }

    default: {
      return state;
    }
  }
}


function _formatScreenshot(screenshot) {
  const screenshotData = screenshot.data.replace(/_/g, '/').replace(/-/g, '+');
  return `data:${screenshot.mime_type};base64,${screenshotData}`;
}
