import * as login from '../login';
import req from '../../request';


describe('login.login', () => {
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
      if (action.type == login.LOGIN_START) {
        assert.equal(action.type, login.LOGIN_START);
        assert.deepEqual(action.payload, {
          auth_response: 'a',
          state: 'b',
          client_id: 'c',
        });
        done();
      }
    }
    login.login('a', 'b', 'c')(dispatch);
  });

  it('dispatches login success', done => {
    function dispatch(action) {
      if (action.type == login.LOGIN_OK) {
        assert.equal(action.type, login.LOGIN_OK);
        assert.deepEqual(action.payload, {
          token: 'abc'
        });
        done();
      }
    }
    login.login()(dispatch);
  });
});


describe('login.logout', () => {
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
      if (action.type == login.LOGOUT_START) {
        assert.equal(action.type, login.LOGOUT_START);
        done();
      }
    }
    login.logout()(dispatch);
  });

  it('dispatches logout success', done => {
    function dispatch(action) {
      if (action.type == login.LOGOUT_OK) {
        assert.equal(action.type, login.LOGOUT_OK);
        done();
      }
    }
    login.logout()(dispatch);
  });
});
