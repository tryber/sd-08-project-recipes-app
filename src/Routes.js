import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import containers from './containers/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ containers.Login } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
