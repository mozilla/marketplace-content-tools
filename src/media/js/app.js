import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router';
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
import Login from './components/handlers/login'
import LoginOAuthRedirect from './components/handlers/loginOAuthRedirect';
import ReviewLanding from './components/handlers/reviewLanding';
import ReviewAddonListing from './components/handlers/reviewAddonListing';
import ReviewWebsiteEdit from './components/handlers/reviewWebsiteEdit';
import ReviewWebsiteListing from './components/handlers/reviewWebsiteListing';
import SubmissionRedirect from './components/handlers/index';
import SubmissionAddon from './components/handlers/submissionAddon';
import SubmissionLanding from './components/handlers/submissionLanding';
import SubmissionWebsite from './components/handlers/submissionWebsite';

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
        <Route name="app" component={App}>
          <Route path="/" component={SubmissionRedirect}/>

          <Route name="login" path="/login" component={Login}/>
          <Route name="login-oauth-redirect" path="/fxa-authorize"
                 component={LoginOAuthRedirect}/>

          <Route name="addon-dashboard" path="/submission/addon/"
                 component={loginRequired(AddonDashboard, Login)}/>

          <Route name="submission-landing" path="/submission/"
                 component={loginRequired(SubmissionLanding, Login,
                                          ['reviewer', 'website_submitter'])}/>
          <Route name="submission-addon" path="/submission/addon/submit/"
                 component={loginRequired(SubmissionAddon, Login,
                                          ['reviewer', 'website_submitter'])}/>
          <Route name="submission-website" path="/submission/website/"
                 component={loginRequired(SubmissionWebsite, Login,
                                          ['reviewer', 'website_submitter'])}/>

          <Route name="review-landing" path="/review/"
                 component={loginRequired(ReviewLanding, Login, 'reviewer')}/>
          <Route name="review-addon-listing" path="/review/addon/"
                 component={loginRequired(ReviewAddonListing, Login,
                                          'reviewer')}/>
          <Route name="review-website-listing" path="/review/website/"
                 component={loginRequired(ReviewWebsiteListing, Login,
                                          'reviewer')}/>
          <Route name="review-website-edit" path="/review/website/:id"
                 component={loginRequired(ReviewWebsiteEdit, Login,
                                          'reviewer')}/>
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
