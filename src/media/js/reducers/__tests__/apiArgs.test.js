import apiArgs from '../apiArgs';
import * as login from '../../actions/login';


describe('apiArgs', () => {
  it('returns initialState', () => {
    const state = apiArgs(undefined, {})
    assert.equal(state.region, 'restofworld');
  });

  it('handles login', () => {
    const state = apiArgs(undefined, {
      type: login.LOGIN_OK,
      payload: {
        token: 'kngo@m.c,abc',
        settings: {
          carrier_sim: 'telefonica',
          region_override: 'vn'
        }
      }
    });
    assert.equal(state._user, 'kngo@m.c,abc');
    assert.equal(state.carrier, 'telefonica');
    assert.equal(state.region, 'vn');
  });

  it('handles logout', () => {
    const state = apiArgs({
      _user: 'kngo@m.c,abc',
      carrier: 'telefonica',
      region: 'vn'
    }, {
      type: login.LOGOUT_OK
    });
    assert.notOk('_user' in state);
    assert.notOk('carrier' in state);
    assert.equal(state.region, 'restofworld');
  });
});
