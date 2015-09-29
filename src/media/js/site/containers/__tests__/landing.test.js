import {Landing} from '../landing';


const props = {
  fxaLoginBegin: () => {},
  login: () => {},
  signTOS: () => {},
  siteConfig: {},
};

describe('Landing', () => {
  jsdom();
  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={Landing} {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'landing').length, 1);
  });
});
