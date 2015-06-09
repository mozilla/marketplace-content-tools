import {Actions, Flummox, Store} from 'flummox';
import FluxComponent from 'flummox/component';
import req from 'superagent-bluebird-promise';


global.assert = require('chai').assert;
global.jsdom = require('mocha-jsdom');
global.React = require('react/addons');
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


sinon.stub(req, 'get', () => {});
sinon.stub(req, 'post', () => {});


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

        const stubs = opts.stubs || [];
        stubs.forEach(stub => {
          root.createActions(stub, FakeActions);
          root.createStore(stub, FakeStore, root);
        });

        const actions = opts.actions || [];
        actions.forEach(action => {
          root.createActions(action[0], action[1]);
        });

        const stores = opts.stores || [];
        stores.forEach(store => {
          root.createStore(store[0], store[1], root);
        });
      }
    }
    return new FakeFlux()
  }
};

global.ReactDOMHelper = {
  click: TestUtils.Simulate.click,
  queryClass: TestUtils.findRenderedDOMComponentWithClass,
  queryClassAll: TestUtils.scryRenderedDOMComponentsWithClass,
  queryTag: TestUtils.findRenderedDOMComponentWithTag,
  queryTagAll: TestUtils.scryRenderedDOMComponentsWithTag,
  render: TestUtils.renderIntoDocument,
  submit: TestUtils.Simulate.submit,
};
