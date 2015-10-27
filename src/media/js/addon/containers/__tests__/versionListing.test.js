import {AddonVersionListing} from '../versionListing';
import * as constants from '../../constants';


describe('AddonVersionListing', () => {
  jsdom();

  const props = {
    addon: addonFactory({status: constants.STATUS_PENDING}),
    slug: 'test-addon',
    deleteVersion: () => {},
    fetchThreads: () => {},
    fetchVersions: () => {},
    threads: {},
    versions: [versionFactory()],
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
      <StubProvider Component={AddonVersionListing} {...props}/>
    );
    assert.equal(ReactDOMHelper.queryClassAll(component, 'version').length, 1);
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
      }
    });

    function deleteVersion(slug, versionId) {
      assert.equal(slug, 'test-addon');
      assert.equal(versionId, 1);
      done();
    }

    const component = ReactDOMHelper.render(
      <StubProvider Component={AddonVersionListing} {...props}
                    deleteVersion={deleteVersion}
                    showDeveloperActions={true}/>
    );
    const deleteBtn = ReactDOM.findDOMNode(component).querySelector(
      '.version--header--buttons .button--delete');

    ReactDOMHelper.click(deleteBtn);
    ReactDOMHelper.click(deleteBtn);
  });
});
