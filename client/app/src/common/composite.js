import { each, curry, keys, pick } from 'lodash/fp';
import { combineReducers } from 'redux';

import { fillDefaults } from './json-schema';
import { arraySchema } from '../models/common';

export const pipeReducers = (...reducers) => (pState, action) => {
  let state = pState;
  each((reducer) => {
    state = reducer(state, action);
  })(reducers);
  return state;
};

export const combinePartialReducers = (reducers) => {
  const baseKeys = keys(reducers);
  const combine = combineReducers(reducers);
  const pickKeys = pick(baseKeys);
  return (state, action) => {
    const partialState = pickKeys(state);
    const newState = combine(partialState, action);
    if (newState !== partialState) {
      return {
        ...state,
        ...newState,
      };
    }
    return state;
  }
}

export const defaultReducer = initialState => (state, action) => {
  return state || initialState;
};

export const emptyReducer = (state, action) => state;

export const defaultApiState = {
  data: null,
  error: null,
  pending: 0,
  active: false,
};

export const getDefaultApiState = (schema, obj = {}) => {
  return {
    ...defaultApiState,
    data: fillDefaults(schema, obj),
  };
};

export const getDataBySchema = schema => (state, action) => (
  fillDefaults(schema, action.data)
);

export const getDataByArraySchema = (schema) => {
  const aSchema = arraySchema(schema);
  return (state, action) => {
    return fillDefaults(aSchema, action.data);
  };
};

export const getDefaultsBySchema = schema => () => {
  return fillDefaults(schema, {});
};

export const getDefaultsByArraySchema = schema => () => {
  return fillDefaults(arraySchema(schema), {});
};

export const fillDefaultsArray = curry((schema, obj = {}) => (
  fillDefaults(arraySchema(schema), obj)
));
