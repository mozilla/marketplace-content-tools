import {AddonDashboardDetail} from '../dashboardDetail';


describe('AddonDashboardDetail', () => {
  jsdom();

  const props = {
    addon: addonFactory(),
    slug: 'test-addon',
    fetchAddon: () => {},
    deleteAddon: () => {},
  };

  it('renders', () => {
    const StubProvider = getStubProvider({
      addon: {
        addons: {},
      },
      addonThread: {
        threads: {}
      },
      router: {
        params: {}
      }
    });

    const component = ReactDOMHelper.render(
      <StubProvider Component={AddonDashboardDetail} {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'addon').length, 1);
  });
});
