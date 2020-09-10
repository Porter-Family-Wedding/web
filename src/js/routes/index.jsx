import React from 'react';
import { Route } from 'react-router-dom';

import AuthenticatedRoute from 'js/common/components/AuthenticatedRoute';

import Home from './Home';
import Login from './Login';

import AdminDashboard from './Admin/Dashboard';

const routes = (
  <>
    {/* Public Routes */}
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />

    {/* Admin Routes */}
    <AuthenticatedRoute exact path="/admin/dashboard" component={AdminDashboard} />
  </>
);

export default routes;