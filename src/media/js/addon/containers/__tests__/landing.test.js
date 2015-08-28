import {AddonLanding} from '../landing';


describe('AddonLanding', () => {
  jsdom();

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonLanding}/>
    );
    assert.equal(ReactDOMHelper.queryTagAll(component, 'section').length, 1);
  });
});
