import React from 'react';
import {Redirect, Route} from 'react-router';

import AddonDashboard from './addon/containers/dashboard';
import AddonDashboardDetail from './addon/containers/dashboardDetail';
import AddonReview from './addon/containers/review';
import AddonReviewDetail from './addon/containers/reviewDetail';
import AddonReviewLog from './addon/containers/reviewLog';
import AddonReviewUpdates from './addon/containers/reviewUpdates';
import AddonSubmit from './addon/containers/submit';

import {ADDON_REVIEW} from './site/constants/login';
import App from './site/containers/app';
import DeveloperAgreement from './site/containers/devAgreement';
import Landing from './site/containers/landing';
import Login from './site/containers/login';
import LoginOAuthRedirect from './site/containers/loginOAuthRedirect';
import {loginRequired} from './site/login';


export default (
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
      <Route name="login" path="login" component={Login}/>
      <Route name="dev-agreement" path="dev-agreement"
             component={DeveloperAgreement}/>

      <Route name="addon" path="addon">
        <Route name="addon-dashboard" path="dashboard/"
               component={loginRequired(AddonDashboard)}/>
        <Route name="addon-dashboard-page" path="dashboard/page/:page"
               component={loginRequired(AddonDashboard)}/>
        <Route name="addon-dashboard-detail" path="dashboard/:slug"
               component={loginRequired(AddonDashboardDetail)}/>

        <Route name="addon-review" path="review/pending/"
               component={loginRequired(AddonReview, ADDON_REVIEW)}/>
        <Route name="addon-review-page" path="review/pending/page/:page"
               component={loginRequired(AddonReview, ADDON_REVIEW)}/>
        <Route name="addon-review-updates" path="review/updates/"
               component={loginRequired(AddonReviewUpdates,
                                        ADDON_REVIEW)}/>
        <Route name="addon-review-updates-page"
               path="review/updates/page/:page"
               component={loginRequired(AddonReviewUpdates,
                                        ADDON_REVIEW)}/>
        <Route name="addon-review-log" path="review/log/"
               component={loginRequired(AddonReviewLog, ADDON_REVIEW)}/>
        <Route name="addon-review-log-page" path="review/log/page/:page"
               component={loginRequired(AddonReviewLog, ADDON_REVIEW)}/>
        <Route name="addon-review-detail" path="review/addon/:slug"
               component={loginRequired(AddonReviewDetail,
                                        ADDON_REVIEW)}/>

        <Route name="addon-submit" path="submit/"
               component={loginRequired(AddonSubmit)}/>
      </Route>
    </Route>
  </Route>
);
