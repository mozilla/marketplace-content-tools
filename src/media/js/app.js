import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';

import Flux from './flux';
import routes from './routes';


const flux = new Flux();


Router.run(routes, Router.HistoryLocation, function(Handler) {
  var component = <FluxComponent flux={flux}>
    <Handler/>
  </FluxComponent>;

  React.render(component, document.body);
});
