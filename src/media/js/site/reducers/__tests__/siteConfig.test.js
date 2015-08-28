import siteConfigReducer from '../siteConfig';
import * as siteConfigActions from '../../actions/siteConfig';


describe('siteConfig reducer', () => {
  it('handles siteConfig fetch', () => {
    const state = siteConfigReducer({}, {
      type: siteConfigActions.FETCH_OK,
      payload: {
        fxa: {
          fxa_auth_state: 'foo',
          fxa_auth_url: 'qux.baz',
        },
        switches: ['bar']
      }
    });
    assert.equal(state.authState, 'foo');
    assert.equal(state.authUrl, 'qux.baz');
    assert.deepEqual(state.switches, ['bar']);
  });

  it('sets localDevClientId on siteConfig fetch', () => {
    const state = siteConfigReducer({
      clientId: 'abc'
    }, {
      type: siteConfigActions.FETCH_OK,
      payload: {
        fxa: {
          fxa_auth_state: 'foo',
          fxa_auth_url: 'qux.baz',
        },
        switches: []
      }
    });

    assert.equal(state.authUrl.toString(), 'qux.baz?client_id=abc');
  });
});
