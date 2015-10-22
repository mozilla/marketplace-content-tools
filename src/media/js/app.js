require('babel/polyfill');
import React from 'react';
import {Provider} from 'react-redux';
import {Redirect, Route, Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import loggerMiddleware from 'redux-logger';
import RavenMiddleware from 'redux-raven-middleware'
import {reduxRouteComponent,
        routerStateReducer as router} from 'redux-react-router';
import persistState from 'redux-localstorage'
import persistSlicer from 'redux-localstorage-slicer';
import thunkMiddleware from 'redux-thunk';

import * as mozAppsActions from './addon/actions/mozApps';
import AddonDashboard from './addon/containers/dashboard';
import AddonDashboardDetail from './addon/containers/dashboardDetail';
import AddonReview from './addon/containers/review';
import AddonReviewDetail from './addon/containers/reviewDetail';
import AddonReviewUpdates from './addon/containers/reviewUpdates';
import AddonSubmit from './addon/containers/submit';
import addon from './addon/reducers/addon';
import addonDashboard from './addon/reducers/dashboard';
import addonReview from './addon/reducers/review';
import addonReviewUpdates from './addon/reducers/reviewUpdates';
import addonSearch from './addon/reducers/search';
import {addonSubmitReducer as
        addonSubmit,
        addonSubmitVersionReducer as
        addonSubmitVersion} from './addon/reducers/submit';
import addonThread from './addon/reducers/thread';
import {ADDON_REVIEW, ADDON_SUBMIT} from './site/constants/login';
import App from './site/containers/app';
import DeveloperAgreement from './site/containers/devAgreement';
import Landing from './site/containers/landing';
import Login from './site/containers/login'
import LoginOAuthRedirect from './site/containers/loginOAuthRedirect';
import {loginRequired} from './site/login';
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
  addonReviewUpdates,
  addonSearch,
  addonSubmit,
  addonSubmitVersion,
  addonThread,
  apiArgs,
  login,
  notification,
  router,
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


function renderRoutes() {
  return (
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        <Route component={App} name="app">

          {/* nginx will be serving this at /content alongside the rest of
              Marketplace, but we need these in place for when it's run as a
              standalone app. */}
          <Redirect from="/" to="/content/"/>
          <Route name="login-oauth-redirect" path="/fxa-authorize"
                 component={LoginOAuthRedirect}/>

          <Route name="root" path="/content/" component={Landing}/>

          {/* This appears to be the only way to have a parent item in the IA
              that defaults to viewing one of the children without having to
              actually replicate a route. */}
          <Redirect from="/content/addon" to="/content/addon/dashboard/"/>

          <Route path="/content">
            <Route name="login" path="/login" component={Login}/>
            <Route name="dev-agreement" path="/dev-agreement"
                   component={DeveloperAgreement}/>

            <Route name="addon" path="/addon">
              <Route name="addon-dashboard" path="/dashboard/"
                     component={loginRequired(AddonDashboard, ADDON_SUBMIT)}/>
              <Route name="addon-dashboard-page" path="/dashboard/page/:page"
                     component={loginRequired(AddonDashboard, ADDON_SUBMIT)}/>
              <Route name="addon-dashboard-detail" path="/dashboard/:slug"
                     component={loginRequired(AddonDashboardDetail,
                                              ADDON_SUBMIT)}/>
              <Route name="addon-review" path="/review/pending/"
                     component={loginRequired(AddonReview, ADDON_REVIEW)}/>
              <Route name="addon-review-page" path="/review/pending/page/:page"
                     component={loginRequired(AddonReview, ADDON_SUBMIT)}/>
              <Route name="addon-review-updates" path="/review/updates/"
                     component={loginRequired(AddonReviewUpdates,
                                              ADDON_REVIEW)}/>
              <Route name="addon-review-updates-page"
                     path="/review/updates/page/:page"
                     component={loginRequired(AddonReviewUpdates,
                                              ADDON_REVIEW)}/>
              <Route name="addon-review-detail" path="/review/addon/:slug"
                     component={loginRequired(AddonReviewDetail,
                                              ADDON_REVIEW)}/>
              <Route name="addon-submit" path="/submit/"
                     component={loginRequired(AddonSubmit, ADDON_SUBMIT)}/>
            </Route>

          </Route>

        </Route>
      </Route>
    </Router>
  );
}


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
          {renderRoutes.bind(null)}
        </Provider>
        {this.renderDevTools()}
      </div>
    );
  }
}


React.render(<ReduxApp/>, document.querySelector('.app-container'));
