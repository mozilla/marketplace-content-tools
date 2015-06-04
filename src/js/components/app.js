import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';

import Footer from './footer';
import Header from './header';


var App = React.createClass({
  render: function () {
    return <div>
      <Header/>
      <main>
        <FluxComponent>
          <Router.RouteHandler/>
        </FluxComponent>
      </main>
      <Footer/>
    </div>
  }
});


export default App;
