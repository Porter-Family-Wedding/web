import { normalize } from 'normalizr';
import { push } from 'connected-react-router';

import api from 'js/api';
import * as models from 'js/common/models';

export const LOADING = 'wedding/entities/loading';
export const LOADED = 'wedding/entities/loaded';
export const LOADING_FAILED = 'wedding/entities/loading_failed';

export const LOADING_TABLE = 'wedding/entities/loading/table';
export const LOADED_TABLE = 'wedding/entities/loaded/table';
export const LOADING_TABLE_FAILED = 'wedding/entities/loading_failed/table';

const initialState = {};

// Add a loading state for each of our models
Object.keys(models).forEach((model) => {
  initialState[model] = {
    loading: false,
    tableData: {
      loading: false,
      total: 0,
      page: 1,
      items: [],
      sort_by: '',
      search: '',
    },
  };
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return { ...state, [action.model]: { ...state[action.model], loading: true } };
    case LOADED: {
      const { entities } = action;

      const mutState = { ...state };

      Object.keys(entities).forEach((model) => {
        const mutModel = { ...mutState[model], loading: false };

        delete mutModel.error;

        Object.keys(entities[model]).forEach((entity) => {
          mutModel[entity] = { ...mutModel[entity], ...entities[model][entity] };
        });

        mutState[model] = mutModel;
      });

      return { ...state, ...mutState };
    }
    case LOADING_FAILED:
      return { ...state, [action.model]: { ...state[action.model], loading: false, error: action.error, } };
    case LOADING_TABLE:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          tableData: {
            ...state[action.model].tableData,
            loading: true
          }
        }
      };
    case LOADED_TABLE:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          tableData: {
            ...state[action.model].tableData,
            loading: false,
            total: action.total,
            items: action.items,
            page: action.page,
            sort_by: action.sort_by,
            search: action.search,
          }
        }
      }
    case LOADING_TABLE_FAILED:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          tableData: {
            ...state[action.model].tableData,
            loading: false,
            error: action.error,
          }
        }
      };
    default:
      return state;
  }
}

export function getById(model, id) {
  return async (dispatch) => {
    dispatch({ type: LOADING, model });

    try {
      const data = await api[model].get(id);

      const { entities } = normalize(data, models[model].schema);

      dispatch({ type: LOADED, entities });
    } catch (err) {
      console.error(err);

      dispatch({ type: LOADING_FAILED, error: err });
    }
  }
}

export function list(model) {
  return async (dispatch) => {
    dispatch({ type: LOADING, model });

    try {
      const { data } = await api[model].list();

      const { entities } = normalize(data, [models[model].schema]);

      dispatch({ type: LOADED, entities });
    } catch (err) {
      console.error(err);

      dispatch({ type: LOADING_FAILED, error: err });
    }
  }
}

export function update(model, id, updates) {
  return async (dispatch) => {
    dispatch({ type: LOADING, model });

    try {
      const data = await api[model].update(id, updates);
      
      const { entities } = normalize(data, models[model].schema);

      dispatch({ type: LOADED, entities });
    } catch (err) {
      console.error(err);

      dispatch({ type: LOADING_FAILED, error: err });
    }
  }
}

export function create(model, data) {
  return async (dispatch) => {
    dispatch({ type: LOADING, model });

    try {
      const resp = await api[model].create(data);
      
      const { entities } = normalize(resp, models[model].schema);

      dispatch({ type: LOADED, entities });

      dispatch(push(`/admin/${model}/${resp.id}`));
    } catch (err) {
      console.error(err);

      dispatch({ type: LOADING_FAILED, error: err });
    }
  }
}

export function getTable(model, { sortBy, ...passthroughOpts }) {
  const options = {
    page: 1,
    limit: 10,
    search: '',
    sort_by: sortBy || 'createdAt:desc',
    ...passthroughOpts,
  };



  return async (dispatch) => {
    dispatch({ type: LOADING_TABLE, model });

    try {
      const { data, count: total } = await api[model].list(true, options);

      const { entities } = normalize(data, [models[model].schema]);

      dispatch({ type: LOADED, model, entities });

      dispatch({
        type: LOADED_TABLE,
        model,
        items: Object.values(data).map(d => d.id.toString()),
        total,
        ...options,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: LOADING_TABLE_FAILED, model, error: err });
    }
  }
}