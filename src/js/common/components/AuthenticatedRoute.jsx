import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from 'store';

import Loading from 'js/common/components/Loading';

import { logout } from 'js/redux/auth';

function AuthWrapper({ component }) {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = store.get('token');

      if (!token) {
        dispatch(logout());
      }
  
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      if (Date.now() > payload.exp * 1000) {
        dispatch(logout());
      } else {
        setLoading(false);
      }
    } catch (err) {
      dispatch(logout());
    }
  }, []);

  if (loading) {
    return <Loading />
  }

  return React.createElement(component);
}

export default function AuthenticatedRoute({ path, component, exact }) {
  return <Route path={path} exact={exact} render={() => <AuthWrapper component={component} />} />;
}

AuthenticatedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

AuthenticatedRoute.defaultProps = {
  exact: false,
};