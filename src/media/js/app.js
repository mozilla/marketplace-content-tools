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
import AddonLanding from './components/handlers/addon/index';
import AddonReview from './components/handlers/addon/review';
import AddonSubmit from './components/handlers/addon/submit';
import Homepage from './components/handlers/index';
import Login from './components/handlers/login'
import LoginOAuthRedirect from './components/handlers/loginOAuthRedirect';
import WebsiteLanding from './components/handlers/website/index';
import WebsiteReviewForm from './components/handlers/website/reviewForm';
import WebsiteReviewListing from './components/handlers/website/reviewListing';
import WebsiteSubmit from './components/handlers/website/submit';

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

            <Route name="addon" path="/addon/"
                   component={loginRequired(AddonLanding, Login,
                                            ['reviewer', 'website_submitter'])}/>
            <Route name="addon-submit" path="/addon/submit"
                   component={loginRequired(AddonSubmit, Login,
                                            ['reviewer', 'website_submitter'])}/>
            <Route name="addon-review" path="/addon/review"
                   component={loginRequired(AddonReview, Login,
                                            ['reviewer', 'website_submitter'])}/>

            <Route name="website" path="/website/"
                   component={loginRequired(WebsiteLanding, Login, 'reviewer')}/>
            <Route name="website-submit" path="/website/submit"
                   component={loginRequired(WebsiteSubmit, Login,
                                            'reviewer')}/>
            <Route name="website-review" path="/website/review"
                   component={loginRequired(WebsiteReviewListing, Login,
                                            'reviewer')}/>
            <Route name="website-review-form" path="/website/review/:id"
                   component={loginRequired(WebsiteReviewForm, Login,
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
