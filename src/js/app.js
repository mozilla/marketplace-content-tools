import React from 'react';
import Router from 'react-router';
import Fluxxor from 'fluxxor';

import Footer from './components/footer';
import Header from './components/header';
import Landing from './components/index';
import ReviewListing from './components/review/index';
import Submit from './components/submit';

import actions from './actions/index';
import stores from './stores/index';

var App = React.createClass({
  render: function () {
    return <div className="app">
      <Header/>
      <main>
        <Router.RouteHandler/>
      </main>
      <Footer/>
    </div>
  }
});


// Routes with react-router.
var Route = Router.Route;
var routes = (
  <Router.Route name="app" path="/submission/" handler={App}>
    <Router.Redirect from="/" to="/submission/" />
    <Router.Route name="landing" path="/submission/" handler={Landing}/>
    <Router.Route name="submit" path="submit/" handler={Submit}/>
    <Router.Route name="review" path="review/" handler={ReviewListing}/>
  </Router.Route>
);


var flux = new Fluxxor.Flux(require('./stores'), actions);
flux.on('dispatch', actions.logDispatch);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler flux={flux}/>, document.body);
});


module.exports = App;
