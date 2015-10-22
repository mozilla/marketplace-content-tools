import addonReviewReducer from '../review';
import * as reviewActions from '../../actions/review';


describe('addonReviewReducer', () => {
  it('handles fetch queue', () => {
    const newState = addonReviewReducer(
      {
        pages: {
          1: {
            addons: []
          }
        },
      },
      {
        type: reviewActions.FETCH_OK,
        payload: {
          addons: [{slug: 'slugly', name: 'Slugly'}],
          page: 1
        }
      }
    );
    assert.equal(newState.pages[1].addons[0].name, 'Slugly');
  });

  it('handles fetch queue, invalidating old queue', () => {
    const newState = addonReviewReducer(
      {
        pages: {
          1: {
            addons: [{name: 'Slugly'}],
          }
        },
      },
      {
        type: reviewActions.FETCH_OK,
        payload: {
          addons: [{slug: 'slugiful', name: 'Slugiful'}],
          page: 1
        }
      }
    );
    assert.equal(newState.pages[1].addons[0].name, 'Slugiful');
  });
});
