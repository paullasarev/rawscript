// import { put } from 'redux-saga/effects';
import { each, has, uniqWith, isEqual, isArray } from 'lodash';

export function dispatchActions(store, actions) {
  for (const action of actions) {
    store.dispatch(action);
  }
}

export const createActionsEnhancer = (options = {}) => next => (reducer, initialState, enhancer) => {
  const { startActionType, log } = options;
  let actions = [];
  let isPending = !!startActionType;
  let store;

  const actionsReducer = reducer => (state, action) => {
    const result = reducer(state, action);
    each(result, (subState) => {
      if (has(subState, 'actions') && isArray(subState.actions) && subState.actions.length) {
        actions.push(...subState.actions);
        delete subState.actions;
      }
    });
    if (isPending && action.type === startActionType) {
      isPending = false;
    }
    if (!isPending && actions.length) {
      const actionsToRun = uniqWith(actions, isEqual);
      actions = [];
      setTimeout((type, actionsToRun) => {
        if (log) {
          log('run actions', type, actionsToRun);
        }
        dispatchActions(store, actionsToRun);
      }, 0, action.type, actionsToRun);
    }
    return result;
  };

  store = next(actionsReducer(reducer), initialState, enhancer);

  const replaceReducer = (reducer) => {
    return store.replaceReducer(actionsReducer(reducer));
  };

  return {
    ...store,
    replaceReducer,
  };
};
