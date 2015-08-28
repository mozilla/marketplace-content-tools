import {AddonDashboard} from '../dashboard';


describe('AddonDashboard', () => {
  jsdom();

  const props = {
    addons: [{name: 'Add-on', slug: 'add-on'}],
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonDashboard}
                          {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'addon-listing')
                               .length, 1);
  });
});
