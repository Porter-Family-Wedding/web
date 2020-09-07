import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';

const routes = (
  <>
    {/* Public Routes */}
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
  </>
);

export default routes;