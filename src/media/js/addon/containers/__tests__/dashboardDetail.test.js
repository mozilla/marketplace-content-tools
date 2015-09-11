import {AddonDashboardDetail} from '../dashboardDetail';


describe('AddonDashboardDetail', () => {
  jsdom();

  const props = {
    addon: addonFactory(),
    slug: 'test-addon',
    fetchAddon: () => {},
    fetchVersions: () => {},
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonDashboardDetail} {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'addon').length, 1);
  });
});
