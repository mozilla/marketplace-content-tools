import {AddonDashboardDetail} from '../dashboardDetail';


describe('AddonDashboardDetail', () => {
  jsdom();

  const props = {
    addon: addonFactory(),
    slug: 'test-addon',
    fetchAddon: () => {},
    deleteAddon: () => {},
    validationError: {},
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
    assert.equal(
      ReactDOMHelper.queryClassAll(component, 'addon-dashboard-detail').length,
      1
    );
  });

  it('can handle delete', done => {
    const StubProvider = getStubProvider({
      addon: {
        addons: {},
      },
      addonThread: {
        threads: {}
      },
      router: {
        params: {}
      },
    });

    function deleteAddon(slug) {
      assert.equal(slug, 'test-addon');
      done();
    }

    const component = ReactDOMHelper.render(
      <StubProvider Component={AddonDashboardDetail} {...props}
                    deleteAddon={deleteAddon}
      />
    );
    const deleteDiv = ReactDOMHelper.queryClass(component,
                                                'addon-dashboard-detail--actions');
    const deleteBtn = ReactDOMHelper.queryTag(deleteDiv, 'button');

    ReactDOMHelper.click(deleteBtn.getDOMNode());
    ReactDOMHelper.click(deleteBtn.getDOMNode());
  });
});
