import req from '../request';


/*
  Force React to recognize that a DOM is available.
  - React will check whether a DOM is available.
  - Requiring React now will have issues since there is currently no DOM.
  - We know that we will generate a DOM later within every Mocha test.
  - Fake a window so that react/lib/ExecutionEnvironment's canUseDOM
    initializes correctly.
*/
const _jsdom = require('jsdom');
global.document = _jsdom.jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
global.React = require('react/addons');

// Require these AFTER setting up React or else it will initialize too early.
const Actions = require('flummox').Actions;
const Flummox = require('flummox').Flummox;
const FluxComponent = require('flummox/component');
const Store = require('flummox').Store;

global.assert = require('chai').assert;
global.FluxTestUtils = require('flummox/test-utils');
global.jsdom = require('mocha-jsdom').bind(this, {skipWindowCheck: true});
global.sinon = require('sinon');
global.TestUtils = React.addons.TestUtils;


let store = {};
global.localStorage = {
  getItem: (k) => {
    return store[k];
  },
  setItem: (k, v) => {
    store[k] = v;
  },
  removeItem: (k) => {
    delete store(k);
  },
  clear: () => {
    store = {};
  },
  length: () => {
    return Object.keys(store).length;
  }
};


afterEach(() => {
  localStorage.clear();
});


// Shortcuts.
global.helpers = {
  fluxWrapper: (component, flux) => {
    return <FluxComponent flux={flux}>
      {component}
    </FluxComponent>
  },
  fluxFactory: (opts) => {
    class FakeStore extends Store {}
    class FakeActions extends Actions{}

    class FakeFlux extends Flummox {
      constructor() {
        super();
        const root = this;

        const actions = opts.actions || [];
        actions.forEach(action => {
          root.createActions(action[0], action[1]);
        });

        const stubActions = opts.stubActions || [];
        stubActions.forEach(stubAction => {
          root.createActions(stubAction, FakeActions);
        });

        const stores = opts.stores || [];
        stores.forEach(store => {
          root.createStore(store[0], store[1], root);
        });

        const stubStores = opts.stubStores || [];
        stubStores.forEach(stubStore => {
          root.createStore(stubStore, FakeStore, root);
        });
      }
    }
    return new FakeFlux()
  }
};

global.ReactDOMHelper = {
  change: TestUtils.Simulate.change,
  click: TestUtils.Simulate.click,
  queryClass: TestUtils.findRenderedDOMComponentWithClass,
  queryClassAll: TestUtils.scryRenderedDOMComponentsWithClass,
  queryTag: TestUtils.findRenderedDOMComponentWithTag,
  queryTagAll: TestUtils.scryRenderedDOMComponentsWithTag,
  render: TestUtils.renderIntoDocument,
  submit: TestUtils.Simulate.submit,
};
