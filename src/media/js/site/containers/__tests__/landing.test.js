import {Landing} from '../landing';


describe('Landing', () => {
  jsdom();

  const props = {
    children: {},
    fxaLoginBegin: () => {},
    login: () => {},
    user: {},
    signTOS: () => {},
    siteConfig: {},
  };

  describe('Landing', () => {
    jsdom();
    it('renders', () => {
      const component = ReactDOMHelper.render(
        <StubRouterProvider Component={Landing}
                            {...props}/>
      );
      assert.equal(ReactDOMHelper.queryClassAll(component, 'landing').length, 1);
    });
  });
});
