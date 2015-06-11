import React from 'react';
import Router from 'react-router';

import App from './components/app';
import {FxaLogin} from './components/login';
import Login from './components/handlers/login'
import {loginRequired} from './components/login';
import SubmissionRedirect from './components/handlers/index';
import Review from './components/handlers/review';
import Submission from './components/handlers/submission';


var Route = Router.Route;
var routes = <Route name="app" path="/" handler={App}>
  <Route handler={SubmissionRedirect}/>
  <Route name="login" path="/login" handler={Login}/>
  <Route name="fxaLogin" path="/fxa-authorize" handler={FxaLogin}/>
  <Route name="review" path="/review" handler={Review}/>
  <Route name="submission" path="/submission" handler={loginRequired(Submission)}/>
</Route>


export default routes;
