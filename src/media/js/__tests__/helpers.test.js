import {Actions, Flummox, Store} from 'flummox';
import FluxComponent from 'flummox/component';

import req from '../request';


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
