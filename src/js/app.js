import Flux from './flux';
import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';
import routes from './routes';


const flux = new Flux();

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render((
    <FluxComponent flux={flux}>
      <Handler/>
    </FluxComponent>
  ), document.body);
});
