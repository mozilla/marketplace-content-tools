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

import App from './components/app';
import EditWebsite from './components/handlers/editWebsite';
import {LoginOAuthRedirectHandler} from './components/login';
import Login from './components/handlers/login'
import ReviewListing from './components/handlers/reviewListing';
import SubmissionRedirect from './components/handlers/index';
import Submission from './components/handlers/submission';

import apiArgs from './reducers/apiArgs';
import login from './reducers/login';
import siteConfig from './reducers/siteConfig';
import submission from './reducers/submission';
import submissionMetadata from './reducers/submissionMetadataForm';
import user from './reducers/user';
import websiteSubmissions from './reducers/websiteSubmissions';


const reducer = combineReducers({
  apiArgs,
  login,
  router,
  siteConfig,
  submission,
  submissionMetadata,
  user,
  websiteSubmissions
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
  return <Router history={history}>
    <Route component={reduxRouteComponent(store)}>
      <Route name="app" component={App}>
        <Route path="/" component={SubmissionRedirect}/>
        <Route name="login-oauth-redirect" path="/fxa-authorize"
               component={LoginOAuthRedirectHandler}/>
        <Route name="login" path="/login" component={Login}/>

        <Route name="submission" path="/submission/"
               component={loginRequired(Submission, Login,
                                        ['reviewer', 'website_submitter'])}/>

        <Route name="review-listing" path="/review/"
               component={loginRequired(ReviewListing, Login, 'reviewer')}/>
        <Route name="edit-website" path="/review/website/:id"
               component={loginRequired(EditWebsite, Login, 'reviewer')}/>
      </Route>
    </Route>
  </Router>
}


class ReduxApp extends React.Component {
  render() {
    return <Provider store={store}>
      {renderRoutes.bind(null)}
    </Provider>
  }
}


React.render(<ReduxApp/>, document.querySelector('.app-container'));
