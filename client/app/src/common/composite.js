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
type JsonSchema = {
  type: string,
};
type Reducer<S, A> = (state: S, action: A) => S;

export function pipeReducers<S, A>(...reducers: Array<Reducer<S, A>>): Reducer<S, A> {
  return (pState: S, action: A): S => {
    let state = pState;
    each((reducer) => {
      state = reducer(state, action);
    })(reducers);
    return state;
  };
}

export function combinePartialReducers<S, A> (reducers: {[key: string]: Reducer<S, A>}): Reducer<S, A> {
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
}

export function defaultReducer<S, A> (initialState: S): Reducer<S, A> {
  return (state: S, action: A): S => {
    return state || initialState;
  };
}

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

export function getDefaultApiState<T>(schema: JsonSchema, obj: {} = {}): ApiState<T> {
  return {
    ...defaultApiState,
    data: (fillDefaults(schema, obj): T),
  };
}

export function getDataBySchema(schema: JsonSchema) {
  return (state, action) => fillDefaults(schema, action.data);
}

export function getDataByArraySchema(schema: JsonSchema) {
  const aSchema = arraySchema(schema);
  return (state, action) => {
    return fillDefaults(aSchema, action.data);
  };
}

export function getDefaultsBySchema(schema: JsonSchema) {
  return () => {
    return fillDefaults(schema, {});
  };
}

export const getDefaultsByArraySchema = schema => () => {
  return fillDefaults(arraySchema(schema), {});
};

export const fillDefaultsArray = curry((schema, obj = {}) => (
  fillDefaults(arraySchema(schema), obj)
));
