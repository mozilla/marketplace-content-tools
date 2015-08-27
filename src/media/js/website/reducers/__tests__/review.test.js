import websiteReviewReducer from '../review';
import * as reviewActions from '../../actions/review';


describe('websiteReviewReducer', () => {
  it('handles fetch', () => {
    const state = websiteReviewReducer({}, {
      type: reviewActions.FETCH_OK,
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
    const state = websiteReviewReducer({
      5: {id: 5, name: 'Swooop'},
      9: {id: 9, name: 'Tanks'}
    }, {
      type: reviewActions.EDIT_SUBMISSION,
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
