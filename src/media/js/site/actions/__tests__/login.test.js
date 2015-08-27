import req from 'request';

import * as loginActions from '../login';


describe('loginActions.login', () => {
  beforeEach(() => {
    sinon.stub(req, 'post', () => {
      return getReqMock({body: {token: 'abc'}});
    });
  });

  afterEach(() => {
    req.post.restore();
  });

  it('dispatches login start', done => {
    function dispatch(action) {
      if (action.type == loginActions.LOGIN_BEGIN) {
        assert.equal(action.type, loginActions.LOGIN_BEGIN);
        assert.deepEqual(action.payload, {
          auth_response: 'a',
          state: 'b',
          client_id: 'c',
        });
        done();
      }
    }
    loginActions.login('a', 'b', 'c')(dispatch);
  });

  it('dispatches login success', done => {
    function dispatch(action) {
      if (action.type == loginActions.LOGIN_OK) {
        assert.equal(action.type, loginActions.LOGIN_OK);
        assert.deepEqual(action.payload, {
          token: 'abc'
        });
        done();
      }
    }
    loginActions.login()(dispatch, () => ({}));
  });
});


describe('loginActions.logout', () => {
  beforeEach(() => {
    sinon.stub(req, 'del', () => {
      return getReqMock();
    });
  });

  afterEach(() => {
    req.del.restore();
  });

  it('dispatches logout start', done => {
    function dispatch(action) {
      if (action.type == loginActions.LOGOUT_BEGIN) {
        assert.equal(action.type, loginActions.LOGOUT_BEGIN);
        done();
      }
    }
    loginActions.logout()(dispatch, () => ({}));
  });

  it('dispatches logout success', done => {
    function dispatch(action) {
      if (action.type == loginActions.LOGOUT_OK) {
        assert.equal(action.type, loginActions.LOGOUT_OK);
        done();
      }
    }
    loginActions.logout()(dispatch, () => ({}));
  });
});
