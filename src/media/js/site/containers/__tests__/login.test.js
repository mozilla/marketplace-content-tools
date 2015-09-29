import {Login} from '../login';


const props = {
  fxaLoginBegin: () => {},
  login: () => {},
  siteConfig: () => {}
};

describe('Login', () => {
  jsdom();

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={Login} {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'login-form').length, 1);
  });
});
