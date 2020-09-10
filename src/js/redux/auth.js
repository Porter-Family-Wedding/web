import store from 'store';
import { push } from 'connected-react-router';

import api from 'js/api';

export const LOADING = 'wedding/auth/loading';
export const LOGIN_SUCCESS = 'wedding/auth/logged_in';
export const LOGIN_FAIL = 'wedding/auth/login_fail';
export const LOGOUT = 'wedding/auth/logout';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state, loading: false, error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state, loading: false, error: action.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function login(username, password) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const resp = await api.login(username, password);

      if (resp.error) {
        dispatch({ type: LOGIN_FAIL, error: data.error_description });

        return;
      }
      store.set('token', resp.token);

      dispatch(push('/admin/dashboard'));

      dispatch({ type: LOGIN_SUCCESS });
    } catch (err) {
      console.error(err);

      dispatch({ type: LOGIN_FAIL, error: err.message || 'Internal server error.' });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    store.remove('token');

    dispatch({ type: LOGOUT });

    dispatch(push('/login'));
  };
}