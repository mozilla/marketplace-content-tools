import React from 'react';
import Router from 'react-router';

import App from './components/app';
import {FxaLogin} from './components/login';
import Login from './components/handlers/login'
import {loginRequired} from './components/login';
import ReviewListing from './components/handlers/reviewListing';
import SubmissionRedirect from './components/handlers/index';
import Submission from './components/handlers/submission';


var Route = Router.Route;
var routes = <Route name="app" path="/" handler={App}>
  <Route handler={SubmissionRedirect}/>
  <Route name="fxaLogin" path="/fxa-authorize" handler={FxaLogin}/>
  <Route name="login" path="/login" handler={Login}/>
  <Route name="submission" path="/submission/"
         handler={loginRequired(Submission)}/>
  <Route name="review-listing" path="/submission/review/"
         handler={loginRequired(ReviewListing)}/>
</Route>


export default routes;
