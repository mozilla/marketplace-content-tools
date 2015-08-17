import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import loggerMiddleware from 'redux-logger';
import {reduxRouteComponent,
        routerStateReducer as router} from 'redux-react-router';
import thunkMiddleware from 'redux-thunk';

import App from './components/app';
import EditWebsite from './components/handlers/editWebsite';
import {FxaLogin} from './components/login';
import Login from './components/handlers/login'
import {loginRequired} from './components/login';
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

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware,
  thunkMiddleware,
)(createStore);

const store = createStoreWithMiddleware(reducer);


class ReduxApp extends React.Component {
  // Need to wrap the handler component in a wrapper since react@0.13 does
  // owner-based context.
  render() {
    return <Provider store={store}>
      {() => <App {...this.props}/>}
    </Provider>
  }
}


React.render(<Router history={history}>
  <Route component={reduxRouteComponent(store)}>
    <Route name="app" path="/" component={ReduxApp}>
      <Route component={SubmissionRedirect}/>
      <Route name="fxaLogin" path="/fxa-authorize" component={FxaLogin}/>
      <Route name="login" path="/login" component={Login}/>

      <Route name="submission" path="/submission/"
             component={loginRequired(Submission,
                                      ['reviewer', 'website_submitter'])}/>
      <Route name="review-listing" path="/submission/review/"
             component={loginRequired(ReviewListing, 'reviewer')}/>
      <Route name="edit-website" path="/review/website/:id"
             component={loginRequired(EditWebsite, 'reviewer')}/>
    </Route>
  </Route>
</Router>, document.querySelector('.app-container'));
