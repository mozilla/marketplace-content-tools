import addonReviewDetailReducer from '../reviewDetail';
import * as addonActions from '../../actions/addon';
import * as reviewActions from '../../actions/review';
import * as constants from '../../constants';


describe('addonReviewDetailReducer', () => {
  it('handles fetch version without add-on in queue', () => {
    const newState = addonReviewDetailReducer(
      {
        addons: {},
      },
      {
        type: addonActions.FETCH_VERSIONS_OK,
        payload: {
          addonSlug: 'slugger',
          versions: [
            {id: 5, version: 2.0}
          ]
        }
      }
    );
    assert.equal(newState.addons.slugger.versions[5].version, 2.0)
  });

  it('handles fetch version with add-on in queue', () => {
    const newState = addonReviewDetailReducer(
      {
        addons: {
          bananaslug: {name: 'Banana Slug'},
          slugfest: {name: 'Slugfest'},
        },
      },
      {
        type: addonActions.FETCH_VERSIONS_OK,
        payload: {
          addonSlug: 'bananaslug',
          versions: [
            {id: 5, version: 2.0}
          ]
        }
      }
    );
    assert.equal(newState.addons.bananaslug.name, 'Banana Slug');
    assert.equal(newState.addons.bananaslug.versions[5].version, 2.0)
    assert.equal(newState.addons.slugfest.name, 'Slugfest');
    assert.notOk(newState.addons.slugfest.versions)
  });

  it('handles fetch queue', () => {
    const newState = addonReviewDetailReducer(
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

  it('handles publish ok', () => {
    const newState = addonReviewDetailReducer(
      {
        addons: {
          slugly: {
            versions: {
              5: {
                isPublishing: true,
                status: 'pending',
              }
            }
          }
        },
      },
      {
        type: reviewActions.PUBLISH_OK,
        payload: {
          addonSlug: 'slugly',
          versionId: 5
        }
      }
    );
    assert.notOk(newState.addons.slugly.versions[5].isPublishing);
    assert.equal(newState.addons.slugly.versions[5].status, 'public');
  });

  it('handles fetch add-on', () => {
    const newState = addonReviewDetailReducer(
      {
        addons: {
          sluggy: {
            versions: 'keepme'
          }
        },
      },
      {
        type: addonActions.FETCH_OK,
        payload: {
          slug: 'sluggy',
          name: 'Sluggy',
        }
      }
    );
    assert.equal(newState.addons.sluggy.versions, 'keepme');
    assert.equal(newState.addons.sluggy.name, 'Sluggy');
  });

  it('handles reject ok', () => {
    const newState = addonReviewDetailReducer(
      {
        addons: {
          slugly: {
            versions: {
              5: {
                isRejecting: true,
                status: 'public',
              }
            }
          }
        },
      },
      {
        type: reviewActions.REJECT_OK,
        payload: {
          addonSlug: 'slugly',
          versionId: 5
        }
      }
    );
    assert.notOk(newState.addons.slugly.versions[5].isRejecting);
    assert.equal(newState.addons.slugly.versions[5].status, 'rejected');
  });
});
