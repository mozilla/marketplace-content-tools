import {AddonReview} from '../review';


describe('AddonReview', () => {
  jsdom();

  const props = {
    addons: [addonFactory()],
    user: {},
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonReview}
                          {...props}/>
    );
    assert.equal(
      ReactDOMHelper.queryClassAll(component,
                                   'addon-listing-for-review').length, 1);
  });
});
