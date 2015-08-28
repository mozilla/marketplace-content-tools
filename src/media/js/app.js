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
import AddonLanding from './addon/containers/landing';
import AddonReview from './addon/containers/review';
import AddonReviewDetail from './addon/containers/reviewDetail';
import AddonSubmit from './addon/containers/submit';
import App from './site/containers/app';
import Landing from './site/containers/landing';
import Login from './site/containers/login'
import LoginOAuthRedirect from './site/containers/loginOAuthRedirect';
import WebsiteLanding from './website/containers/landing';
import WebsiteReview from './website/containers/review';
import WebsiteReviewForm from './website/containers/reviewForm';
import WebsiteSubmit from './website/containers/submit';

import addonDashboard from './addon/reducers/dashboard';
import addonReview from './addon/reducers/review';
import addonSubmit from './addon/reducers/submit';
import apiArgs from './site/reducers/apiArgs';
import login from './site/reducers/login';
import siteConfig from './site/reducers/siteConfig';
import user from './site/reducers/user';
import websiteReview from './website/reducers/review';
import websiteSubmit from './website/reducers/submit';
import websiteSubmitUrl from './website/reducers/submitUrl';


const reducer = combineReducers({
  // The name of the reducers, as imported, will be the keys of state tree.
  addonDashboard,
  addonReview,
  addonSubmit,
  apiArgs,
  login,
  router,
  siteConfig,
  user,
  websiteReview,
  websiteSubmit,
  websiteSubmitUrl,
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
storeEnhancers.push(createStore);


const createFinalStore = compose.apply(this, storeEnhancers);
const store = createFinalStore(reducer);


function renderRoutes() {
  return (
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        <Route component={App} name="app">

          {/* nginx will be serving this at /content, but we need this in
              place for when it's run as a standalone app. */}
          <Redirect from="/" to="/content/"/>
          <Route name="login-oauth-redirect" path="/fxa-authorize"
                 component={LoginOAuthRedirect}/>

          <Route name="root" path="/content/"
                 component={loginRequired(Landing, Login,
                                          ['reviewer', 'website_submitter'])}/>


          <Route path="/content">
            <Route name="login" path="/login" component={Login}/>

            <Route name="addon" path="/addon/"
                   component={loginRequired(AddonLanding, Login,
                                            ['reviewer',
                                             'website_submitter'])}/>
            <Route name="addon-dashboard" path="/addon/dashboard/"
                   component={loginRequired(AddonDashboard, Login)}/>
            <Route name="addon-review" path="/addon/review/"
                   component={loginRequired(AddonReview, Login,
                                            ['reviewer'])}/>
            <Route name="addon-review-detail" path="/addon/review/:slug"
                   component={loginRequired(AddonReviewDetail, Login,
                                            ['reviewer'])}/>
            <Route name="addon-submit" path="/addon/submit/"
                   component={loginRequired(AddonSubmit, Login,
                                            ['reviewer',
                                             'website_submitter'])}/>

            <Route name="website" path="/website/"
                   component={loginRequired(WebsiteLanding, Login,
                                            'reviewer')}/>
            <Route name="website-review" path="/website/review/"
                   component={loginRequired(WebsiteReview, Login,
                                            'reviewer')}/>
            <Route name="website-review-form" path="/website/review/:id"
                   component={loginRequired(WebsiteReviewForm, Login,
                                            'reviewer')}/>
            <Route name="website-submit" path="/website/submit/"
                   component={loginRequired(WebsiteSubmit, Login,
                                            'reviewer')}/>
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
      const DiffMonitor = require('redux-devtools-diff-monitor');
      return (
        <reduxDevTools.DebugPanel top right bottom>
          <reduxDevTools.DevTools store={store} monitor={DiffMonitor}/>
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
