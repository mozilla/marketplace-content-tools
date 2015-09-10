import addonReviewReducer from '../review';
import * as reviewActions from '../../actions/review';


describe('addonReviewReducer', () => {
  it('handles fetch queue', () => {
    const newState = addonReviewReducer(
      {
        addons: {},
      },
      {
        type: reviewActions.FETCH_OK,
        payload: [
          {slug: 'slugly', name: 'Slugly'}
        ]
      }
    );
    assert.equal(newState.addons.slugly.name, 'Slugly');
  });

  it('handles fetch queue, invalidating old queue', () => {
    const newState = addonReviewReducer(
      {
        addons: {
          slugly: {name: 'Slugly'}
        },
      },
      {
        type: reviewActions.FETCH_OK,
        payload: [
          {slug: 'slugiful', name: 'Slugiful'}
        ]
      }
    );
    assert.equal(newState.addons.slugiful.name, 'Slugiful');
    assert.notOk(newState.addons.slugly);
  });
});
