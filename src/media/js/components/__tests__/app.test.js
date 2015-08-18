import {Provider} from 'react-redux';
import stubContext from 'react-stub-context'

import App from '../app';
import * as loginActions from '../../actions/login';
import * as siteConfigActions from '../../actions/siteConfig';


function setup(isLoggedIn) {
  const stubStore = {
    dispatch: () => {},
    getState: () => {
      return {
        user: {
          token: isLoggedIn
        }
      };
    },
    subscribe: () => {},
  };

  const StubApp = stubContext(App, {router: StubRouter});
  return ReactDOMHelper.render(
    <Provider store={stubStore}>
      {() => <StubApp/>}
    </Provider>
  );
}


describe.only('App', () => {
  jsdom();

  beforeEach(() => {
    sinon.spy(loginActions, 'loginOk');
    sinon.spy(siteConfigActions, 'fetch');
  });

  afterEach(() => {
    loginActions.loginOk.restore();
    siteConfigActions.fetch.restore();
  });

  it('calls siteConfigFetch', () => {
    setup();
    assert.ok(siteConfigActions.fetch.callCount);
  });

  it('does not dispatch login if not logged in', () => {
    setup();
    assert.notOk(loginActions.loginOk.callCount);
  });

  it('dispatches login if logged in', () => {
    setup('abc');
    assert.deepEqual(loginActions.loginOk.firstCall.args[0], {token: 'abc'});
  });
});
