import {AddonReview} from '../review';


describe('AddonReview', () => {
  jsdom();

  const props = {
    addons: [{name: 'Add-on', slug: 'add-on'}]
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonReview}
                          {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'addon').length, 1);
  });
});
