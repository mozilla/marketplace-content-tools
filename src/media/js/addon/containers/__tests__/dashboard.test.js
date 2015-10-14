import {AddonDashboard} from '../dashboard';


describe('AddonDashboard', () => {
  jsdom();

  const props = {
    addons: [addonFactory()],
    user: {},
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonDashboard} {...props}/>
    );
    assert.equal(
      ReactDOMHelper.queryClassAll(component,
                                   'addon-listing-dashboard').length,
      1
    );
  });
});
