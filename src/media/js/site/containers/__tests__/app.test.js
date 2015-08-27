import {App} from '../app';
import {initialState as
        siteConfigInitialState} from '../../reducers/siteConfig';
import {initialState as userInitialState}  from '../../reducers/user';


describe('App', () => {
  jsdom();

  it('calls siteConfigFetch', done => {
    ReactDOMHelper.render(
      <App siteConfig={siteConfigInitialState}
           siteConfigFetch={done}
           user={userInitialState}/>
    );
  });

  it('does not dispatch login if not logged in', done => {
    function fail() {
      assert.equal(1, 0);
      done();
    }
    ReactDOMHelper.render(
      <App loginOk={fail}/>
    );
  });

  it('dispatches login if logged in', done => {
    function loginOk(user) {
      assert.equal(user.token, 'abc');
      done();
    }
    ReactDOMHelper.render(
      <App siteConfig={siteConfigInitialState}
           siteConfigFetch={() => {}}
           loginOk={loginOk}
           user={{...userInitialState, ...{token: 'abc'}}}/>
    );
  });
});
