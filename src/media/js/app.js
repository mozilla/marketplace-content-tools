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

import {loginRequired} from './site/login';

import AddonDashboard from './addon/containers/dashboard';
import AddonDashboardDetail from './addon/containers/dashboardDetail';
import AddonReview from './addon/containers/review';
import AddonReviewDetail from './addon/containers/reviewDetail';
import AddonSubmit from './addon/containers/submit';
import App from './site/containers/app';
import DeveloperAgreement from './site/containers/devAgreement';
import Landing from './site/containers/landing';
import Login from './site/containers/login'
import LoginOAuthRedirect from './site/containers/loginOAuthRedirect';

import addon from './addon/reducers/addon';
import addonDashboard from './addon/reducers/dashboard';
import addonReview from './addon/reducers/review';
import addonThread from './addon/reducers/thread';
import {addonSubmitReducer as
        addonSubmit,
        addonSubmitVersionReducer as
        addonSubmitVersion} from './addon/reducers/submit';
import apiArgs from './site/reducers/apiArgs';
import login from './site/reducers/login';
import siteConfig from './site/reducers/siteConfig';
import user from './site/reducers/user';


const reducer = combineReducers({
  // The name of the reducers, as imported, will be the keys of state tree.
  addon,
  addonDashboard,
  addonReview,
  addonSubmit,
  addonSubmitVersion,
  addonThread,
  apiArgs,
  login,
  router,
  siteConfig,
  user,
});


let storeEnhancers = [
  persistState(null, {
    // redux-localstorage
    slicer: persistSlicer()
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

const LOGIN = 'content_tools_login';
const ADDON_REVIEW = [LOGIN, 'content_tools_addon_review'];
const ADDON_SUBMIT = [LOGIN, 'content_tools_addon_submit'];


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
              <Route name="addon-review" path="/review/"
                     component={loginRequired(AddonReview, ADDON_REVIEW)}/>
              <Route name="addon-review-detail" path="/review/:slug"
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
