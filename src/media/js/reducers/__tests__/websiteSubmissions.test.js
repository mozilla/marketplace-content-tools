import websiteSubmissionsReducer from '../websiteSubmissions';
import * as websiteSubmissionActions from '../../actions/websiteSubmissions';


describe('websiteSubmissionReducer', () => {
  it('handles fetch', () => {
    const state = websiteSubmissionsReducer({}, {
      type: websiteSubmissionActions.FETCH_OK,
      payload: [
        {id: 5, name: 'Swooop'},
        {id: 9, name: 'Tanx'},
      ]
    });
    assert.deepEqual(state, {
      5: {id: 5, name: 'Swooop'},
      9: {id: 9, name: 'Tanx'},
    });
  });

  it('handles edit', () => {
    const state = websiteSubmissionsReducer({
      5: {id: 5, name: 'Swooop'},
      9: {id: 9, name: 'Tanks'}
    }, {
      type: websiteSubmissionActions.EDIT_SUBMISSION,
      payload: {
        id: 9,
        name: 'Tanx'
      }
    });
    assert.deepEqual(state, {
      5: {id: 5, name: 'Swooop'},
      9: {id: 9, name: 'Tanx'},
    });
  });
});
