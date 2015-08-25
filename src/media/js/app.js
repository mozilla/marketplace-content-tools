import React from 'react';
import {Provider} from 'react-redux';
import {Redirect, Route, Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import loggerMiddleware from 'redux-logger';
import {reduxRouteComponent,
        routerStateReducer as router} from 'redux-react-router';
import persistState from 'redux-localstorage'
import persistSlicer from 'redux-localstorage-slicer';
import thunkMiddleware from 'redux-thunk';

import {loginRequired} from './login';

import AddonDashboard from './components/handlers/addonDashboard';
import App from './components/app';
import AddonLanding from './components/handlers/addons/index';
import AddonReview from './components/handlers/addons/review';
import AddonSubmit from './components/handlers/addons/submit';
import Homepage from './components/handlers/index';
import Login from './components/handlers/login'
import LoginOAuthRedirect from './components/handlers/loginOAuthRedirect';
import WebsiteLanding from './components/handlers/websites/index';
import WebsiteReviewForm from './components/handlers/websites/reviewForm';
import WebsiteReviewListing from './components/handlers/websites/reviewListing';
import WebsiteSubmit from './components/handlers/websites/submit';

import addonDashboard from './reducers/addonDashboard';
import apiArgs from './reducers/apiArgs';
import login from './reducers/login';
import reviewWebsiteListing from './reducers/reviewWebsiteListing';
import siteConfig from './reducers/siteConfig';
import submissionAddon from './reducers/submissionAddon';
import submissionWebsite from './reducers/submissionWebsite';
import submissionWebsiteUrl from './reducers/submissionWebsiteUrl';
import user from './reducers/user';


const reducer = combineReducers({
  // The name of the reducers, as imported, will be the keys of state tree.
  addonDashboard,
  apiArgs,
  login,
  reviewWebsiteListing,
  router,
  siteConfig,
  submissionAddon,
  submissionWebsite,
  submissionWebsiteUrl,
  user,
});

const createPersistentStore = compose(
  persistState(null, {
    slicer: persistSlicer()
  }),
  createStore
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
)(createPersistentStore);

const store = createStoreWithMiddleware(reducer);


function renderRoutes() {
  return (
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        <Route component={App} name="app">

          {/* nginx will be serving this at /content, but we need this in
              place for when it's run as a standalone app. */}
          <Redirect from="/" to="/content"/>

          <Route path="/content">
            <Route name="homepage" component={Homepage}/>
            <Route name="login" path="/login" component={Login}/>
            <Route name="login-oauth-redirect" path="/fxa-authorize"
                   component={LoginOAuthRedirect}/>
            <Route name="addons" path="/addons"
                   component={loginRequired(AddonsLanding, Login,
                                            ['reviewer', 'website_submitter'])}/>
            <Route name="addons-submit" path="/addons/submit"
                   component={loginRequired(AddonsSubmit, Login,
                                            ['reviewer', 'website_submitter'])}/>
            <Route name="addons-review" path="/addons/review"
                   component={loginRequired(AddonsReview, Login,
                                            ['reviewer', 'website_submitter'])}/>
            <Route name="websites" path="/websites"
                   component={loginRequired(WebsitesLanding, Login, 'reviewer')}/>
            <Route name="websites-submit" path="/websites/submit"
                   component={loginRequired(WebsitesSubmit, Login,
                                            'reviewer')}/>
            <Route name="websites-review" path="/websites/review"
                   component={loginRequired(WebsitesReviewListing, Login,
                                            'reviewer')}/>
            <Route name="websites-review-form" path="/websites/review/:id"
                   component={loginRequired(WebsitesReviewForm, Login,
                                            'reviewer')}/>
          </Route>
        </Route>
      </Route>
    </Router>
  );
}


class ReduxApp extends React.Component {
  render() {
    return <Provider store={store}>
      {renderRoutes.bind(null)}
    </Provider>
  }
}


React.render(<ReduxApp/>, document.querySelector('.app-container'));
