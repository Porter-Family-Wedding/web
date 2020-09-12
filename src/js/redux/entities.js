import { normalize } from 'normalizr';

import api from 'js/api';
import * as models from 'js/common/models';

export const LOADING = 'wedding/entities/loading';
export const LOADED = 'wedding/entities/loaded';
export const LOADING_FAILED = 'wedding/entities/loading_failed';

const initialState = {};

// Add a loading state for each of our models
Object.keys(models).forEach((model) => {
  initialState[model] = { loading: false };
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
    default:
      return state;
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