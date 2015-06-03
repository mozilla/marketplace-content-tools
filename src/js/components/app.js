import React from 'react';
import Router from 'react-router';

import Footer from './footer';
import Header from './header';


var App = React.createClass({
  render: function () {
    return <div>
      <Header/>
      <main>
        <Router.RouteHandler/>
      </main>
      <Footer/>
    </div>
  }
});


export default App;
