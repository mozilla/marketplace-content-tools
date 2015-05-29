var Footer = require('./footer');
var Header = require('./header');
var React = require('react');
var Router = require('react-router');


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


var Landing = React.createClass({
    render: function() {
        return <p>
          Welcome.
        </p>
    }
});


// Routes with react-router.
var Route = Router.Route;
var routes = <Route name="app" handler={App}>
  <Route name="landing" path="/" handler={Landing}/>
</Route>;


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});


module.exports = App;
