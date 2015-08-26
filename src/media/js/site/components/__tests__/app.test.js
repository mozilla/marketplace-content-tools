import App from '../app';


describe('App', () => {
  jsdom();

  it('calls siteConfigFetch', done => {
    ReactDOMHelper.render(<App siteConfigFetch={done}/>);
  });

  it('does not dispatch login if not logged in', done => {
    function fail() {
      assert.equal(1, 0);
      done();
    }
    ReactDOMHelper.render(<App loginOk={fail}/>);
  });

  it('dispatches login if logged in', done => {
    function loginOk(user) {
      assert.equal(user.token, 'abc');
      done();
    }
    ReactDOMHelper.render(<App loginOk={loginOk} user={{token: 'abc'}}/>);
  });
});
