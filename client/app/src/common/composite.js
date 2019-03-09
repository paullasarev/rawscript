// @flow
import { each, curry, keys, pick } from 'lodash/fp';
import { combineReducers } from 'redux';

import { fillDefaults } from './json-schema';
import { arraySchema } from '../models/common';

type BaseAction = {
  type: string,
};
type BaseState = {};
type BaseReducer = (state: BaseState, action: BaseAction) => BaseState;
type BaseReducers = Array<BaseReducer>;
type BaseSchema = {
  type: string,
};

export const pipeReducers = (...reducers: BaseReducers) => (pState: BaseState, action: BaseAction) => {
  let state = pState;
  each((reducer) => {
    state = reducer(state, action);
  })(reducers);
  return state;
};

export const combinePartialReducers = (reducers: {[key: string]: BaseReducer}): BaseReducer => {
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
  };
};

export const defaultReducer = (initialState: {}) => (state: {}, action: BaseAction) => {
  return state || initialState;
};

export const emptyReducer = (state: {}, action: BaseAction) => state;

export type ApiState<Item> = {
  data: null | Item,
  error: null | {},
  pending: number,
  active: boolean,
}

export const defaultApiState = {
  data: null,
  error: null,
  pending: 0,
  active: false,
};

export function getDefaultApiState<T>(schema: BaseSchema, obj: {} = {}): ApiState<T> {
  return {
    ...defaultApiState,
    data: (fillDefaults(schema, obj): T),
  };
}

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
