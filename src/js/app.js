import React from 'react';
import Router from 'react-router';

import Footer from './components/footer';
import Header from './components/header';
import Landing from './components/index';
import ReviewListing from './components/review/index';
import Submit from './components/submit';


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
var routes = <Route name="app" path="/submission/" handler={App}>
  <Route name="landing" path="/submission/" handler={Landing}/>
  <Route name="submit" path="submit/" handler={Submit}/>
  <Route name="review" path="review/" handler={ReviewListing}/>
</Route>;


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});


module.exports = App;
