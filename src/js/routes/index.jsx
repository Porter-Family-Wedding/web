import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

const routes = (
  <>
    {/* Public Routes */}
    <Route exact path="/" component={Home} />
  </>
);

export default routes;