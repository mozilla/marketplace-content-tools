import reviewWebsiteListingReducer from '../reviewWebsiteListing';
import * as reviewWebsiteListingActions
         from '../../actions/reviewWebsiteListing';


describe('reviewWebsiteListingReducer', () => {
  it('handles fetch', () => {
    const state = reviewWebsiteListingReducer({}, {
      type: reviewWebsiteListingActions.FETCH_OK,
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
    const state = reviewWebsiteListingReducer({
      5: {id: 5, name: 'Swooop'},
      9: {id: 9, name: 'Tanks'}
    }, {
      type: reviewWebsiteListingActions.EDIT_SUBMISSION,
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
