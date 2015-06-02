import React from 'react';
import Router from 'react-router';
import Fluxxor from 'fluxxor';

import routes from './routes';


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler flux={flux}/>, document.body);
});
