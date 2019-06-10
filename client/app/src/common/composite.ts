import { each, curry, keys, pick } from 'lodash/fp';
import { combineReducers, AnyAction } from 'redux';

import { fillDefaults } from './json-schema';
import { arraySchema } from '../models/common';


// type BaseAction = {
//   type: string,
// };
// type BaseState = {};
type JsonSchema = {
  type: string,
};

type Reducer<S, A> = (state: S, action: A) => S;
// type Reducers<S, A> = Array<Reducer<S, A>>;

export type ReducerMap<S, A> = {
  [key: string]: Reducer<S, A>
};

export function pipeReducers<S, A>(...reducers: Array<Reducer<S, A>>): Reducer<S, A> {
  return (pState: S, action: A): S => {
    let state = pState;
    each((reducer: Reducer<S, A>) => {
      state = reducer(state, action);
    })(reducers);
    return state;
  };
}

export function combinePartialReducers<S, A> (reducers: ReducerMap<S, A>): Reducer<S, A> {
  const baseKeys = keys(reducers);
  const reducer = combineReducers(reducers);
  const pickByKeys = pick(baseKeys);
  return (state: S, action: A) => {
    const partialState = (<S>pickByKeys(state));
    const newState = reducer(partialState, action);
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

export const emptyReducer = <S, A>(state: S, action: S): S => state;

export type ApiState<Item> = {
  data: Item,
  error: null | {},
  pending: number,
  active: boolean,
}

export const defaultApiState = <T>(data: T): ApiState<T> => {
  return {
    data,
    error: null,
    pending: 0,
    active: false,
  };
};

export function getDefaultApiState<T>(schema: JsonSchema, obj: {} = {}): ApiState<T> {
  return defaultApiState<T>(fillDefaults(schema, obj));
}

export function getDataBySchema(schema: JsonSchema) {
  return (state: any, action: any) => fillDefaults(schema, action.data);
}

export function getDataByArraySchema(schema: JsonSchema) {
  const aSchema = arraySchema(schema);
  return (state: any, action: any) => {
    return fillDefaults(aSchema, action.data);
  };
}

export function getDefaultsBySchema(schema: JsonSchema) {
  return () => fillDefaults(schema, {});
}

export function getDefaultsByArraySchema(schema: JsonSchema) {
  return () => fillDefaults(arraySchema(schema), {});
}

export function fillDefaultsArray(schema: JsonSchema, obj: {} = {}) {
  return fillDefaults(arraySchema(schema), obj);
}
