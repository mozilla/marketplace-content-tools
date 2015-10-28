import {App} from '../app';
import {initialState as userInitialState}  from '../../reducers/user';


describe('App', () => {
  jsdom();

  const props = {
    checkSession: () => {},
    children: <div/>,
    fxaLoginBegin: () => {},
    login: () => {},
    loginBeginHandler: () => {},
    loginOk: () => {},
    logout: () => {},
    logoutHandler: () => {},
    routes: [],
    siteConfigFetch: () => {},
  };

  it('calls siteConfigFetch', done => {
    ReactDOMHelper.render(
      <StubRouterProvider Component={App}
                          {...props}
                          siteConfigFetch={done}/>
    );
  });

  it('does not dispatch login if not logged in', () => {
    function fail() {
      assert.equal(1, 0);
    }
    ReactDOMHelper.render(
      <StubRouterProvider Component={App}
                          {...props}
                          loginOk={fail}/>
    );
  });

  it('dispatches login if logged in', done => {
    function loginOk(user) {
      assert.equal(user.token, 'abc');
      done();
    }
    ReactDOMHelper.render(
      <StubRouterProvider Component={App}
                          {...props}
                          loginOk={loginOk}
                          user={{...userInitialState, ...{token: 'abc'}}}/>
    );
  });
});
