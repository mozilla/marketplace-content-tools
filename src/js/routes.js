import React from 'react';
import Router from 'react-router';

import App from './components/app';
import {LoginHandler} from './components/login';
import SubmissionRedirect from './components/handlers/index';
import Review from './components/handlers/review';
import Submission from './components/handlers/submission';


var Route = Router.Route;
var routes = <Route name="app" path="/" handler={App}>
  <Route handler={SubmissionRedirect}/>
  <Route name="login" path="/fxa-authorize" handler={LoginHandler}/>
  <Route name="review" path="/review" handler={Review}/>
  <Route name="submission" path="/submission" handler={Submission}/>
</Route>


export default routes;
