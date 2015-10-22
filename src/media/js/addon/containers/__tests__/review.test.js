import {AddonReviewContainer} from '../review';


describe('AddonReviewContainer', () => {
  jsdom();

  const props = {
    addonSearch: {
      results: []
    },
    fetch: () => {},
    queue: {
      addons: [addonFactory()],
    },
    user: {},
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonReviewContainer} {...props}/>
    );
    assert.equal(
      ReactDOMHelper.queryClassAll(component,
                                   'addon-listing-for-review').length, 1);
  });
});
