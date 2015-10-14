import {AddonReviewDetail} from '../reviewDetail';


describe('AddonReviewDetail', () => {
  jsdom();

  const props = {
    addon: addonFactory(),
    fetchAddon: () => {},
    fetchThreads: () => {},
    fetchVersions: () => {},
    getInstalledAddons: () => {},
    installAddon: () => {},
    user: {},
  };

  it('renders', () => {
    const StubProvider = getStubProvider({
      addon: {
        addons: {}
      },
      addonThread: {
        threads: {}
      },
      router: {
        params: {}
      }
    });
    const component = ReactDOMHelper.render(
      <StubProvider Component={AddonReviewDetail} {...props}/>
    );
    assert.equal(
      ReactDOMHelper.queryClassAll(component,
                                   'addon-review-detail-addon').length, 1);
  });
});
