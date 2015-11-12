require('babel/polyfill');
import {createHistory} from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import loggerMiddleware from 'redux-logger';
import RavenMiddleware from 'redux-raven-middleware';
import persistState from 'redux-localstorage';
import persistSlicer from 'redux-localstorage-slicer';
import {reduxReactRouter, ReduxRouter, routerStateReducer} from 'redux-router';
import thunkMiddleware from 'redux-thunk';

import * as mozAppsActions from './addon/actions/mozApps';

import addon from './addon/reducers/addon';
import addonDashboard from './addon/reducers/dashboard';
import addonReview from './addon/reducers/review';
import addonReviewLog from './addon/reducers/reviewLog';
import addonReviewUpdates from './addon/reducers/reviewUpdates';
import addonSearch from './addon/reducers/search';
import {addonSubmitReducer as
        addonSubmit,
        addonSubmitVersionReducer as
        addonSubmitVersion} from './addon/reducers/submit';
import addonThread from './addon/reducers/thread';
import routes from './routes';
import apiArgs from './site/reducers/apiArgs';
import login from './site/reducers/login';
import notification from './site/reducers/notification';
import siteConfig from './site/reducers/siteConfig';
import user from './site/reducers/user';


const reducer = combineReducers({
  // The name of the reducers, as imported, will be the keys of state tree.
  addon,
  addonDashboard,
  addonReview,
  addonReviewLog,
  addonReviewUpdates,
  addonSearch,
  addonSubmit,
  addonSubmitVersion,
  addonThread,
  apiArgs,
  login,
  notification,
  router: routerStateReducer,
  siteConfig,
  user,
});


// Bump to invalidate localStorage.
const REDUX_LOCALSTORAGE_VERSION = 1;

let storeEnhancers = [
  persistState(null, {
    // redux-localstorage
    slicer: persistSlicer(REDUX_LOCALSTORAGE_VERSION)
  }),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    RavenMiddleware(
      'https://89570b6cb9b6474aaf269716621836ee@sentry.prod.mozaws.net/44'),
  ),
  reduxReactRouter({
    createHistory,
    routes
  }),
]
if (process.env.NODE_ENV !== 'production') {
  // Apply dev tools locally.
  storeEnhancers.push(require('redux-devtools').devTools());
}


const createFinalStore = compose.apply(this, storeEnhancers)(createStore);
const store = createFinalStore(reducer);


document.addEventListener('visibilitychange', () => {
  // Refresh installed add-ons on visibility change.
  if (!document.hidden) {
    store.dispatch(mozAppsActions.getInstalled());
  }
});


class ReduxApp extends React.Component {
  renderDevTools() {
    // Render dev tools locally.
    if (process.env.NODE_ENV !== 'production') {
      const reduxDevTools = require('redux-devtools/lib/react');
      return (
        <reduxDevTools.DebugPanel top right bottom>
          <reduxDevTools.DevTools store={store}
                                  monitor={reduxDevTools.LogMonitor}
                                  visibleOnLoad={false}/>
        </reduxDevTools.DebugPanel>
      );
    }
  }

  render() {
    return (
      <div className="app-container">
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>
      </div>
    );
  }
}


ReactDOM.render(<ReduxApp/>, document.querySelector('.app-container'));
