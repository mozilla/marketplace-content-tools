import addonReducer from '../addon';
import * as addonActions from '../../actions/addon';
import * as dashboardActions from '../../actions/dashboard';
import * as mozAppsActions from '../../actions/mozApps';
import * as reviewActions from '../../actions/review';
import * as submitVersionActions from '../../actions/submitVersion';
import * as constants from '../../constants';


describe('addonReducer', () => {
  it('handles fetch version without add-on in queue', () => {
    const newState = addonReducer(
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
    const newState = addonReducer(
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
    const newState = addonReducer(
      {
        addons: {},
      },
      {
        type: reviewActions.FETCH_OK,
        payload: {
          addons: [{slug: 'slugly', name: 'Slugly'}]
        }
      }
    );
    assert.equal(newState.addons.slugly.name, 'Slugly');
  });

  it('handles publish ok', () => {
    const newState = addonReducer(
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

  it('handles reject ok', () => {
    const newState = addonReducer(
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

  it('adds version upon version submit', () => {
    const newState = addonReducer(
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
        type: submitVersionActions.SUBMIT_OK,
        payload: {
          addonSlug: 'slugly',
          version: {id: 10}
        }
      }
    );
    assert.equal(newState.addons.slugly.versions[10].id, 10);
  });

  it('marks add-on as deleted', () => {
    const newState = addonReducer(
      {
        addons: {
          slugly: {}
        },
      },
      {
        type: dashboardActions.DELETE_OK,
        payload: 'slugly'
      }
    );
    assert.ok(newState.addons.slugly.deleted);
  });

  it('updates installed states of add-ons', () => {
    const newState = addonReducer(
      {
        addons: {
          wasInstalled: {
            latest_version: {reviewer_mini_manifest_url: 'was.installed'},
            isInstalled: true,
          },
          stillInstalled: {
            latest_version: {reviewer_mini_manifest_url: 'still.installed'},
            isInstalled: true
          },
          nowInstalled: {
            latest_version: {reviewer_mini_manifest_url: 'now.installed'},
            isInstalled: false
          },
          noLatestVersion: {},
        },
      },
      {
        type: mozAppsActions.GET_INSTALLED_OK,
        payload: ['still.installed', 'now.installed']
      }
    );

    assert.notOk(newState.addons.wasInstalled.isInstalled,
                 'wasInstalled should no longer be installed');
    assert.ok(newState.addons.stillInstalled.isInstalled,
              'stillInstalled should still be installed');
    assert.ok(newState.addons.nowInstalled.isInstalled,
              'nowInstalled should now be installed');
    assert.notOk(newState.addons.noLatestVersion.isInstalled,
                 'apps fetched as a non-reviewer should not be installed');
  });
});
