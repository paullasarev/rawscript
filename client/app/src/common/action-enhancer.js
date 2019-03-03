import { put } from 'redux-saga/effects';
import { each, has, uniqWith, isEqual, isArray } from 'lodash';

export function* runActions(actions) {
  for (const action of actions) {
    yield put(action);
  }
}

export const createActionsEnhancer = sagaMiddleware => next => (reducer, initialState, enhancer) => {
  let actions = [];

  const actionsReducer = reducer => (state, action) => {
    const result = reducer(state, action);
    each(result, (subState) => {
      if (has(subState, 'actions') && isArray(subState.actions) && subState.actions.length) {
        actions.push(...subState.actions);
        delete subState.actions;
      }
    });
    if (actions.length) {
      const actionsToRun = uniqWith(actions, isEqual);
      actions = [];
      setTimeout(() => {
        console.log('run actions', action.type, actionsToRun);
        sagaMiddleware.run(runActions, actionsToRun);
      }, 0);
    }
    return result;
  };

  const store = next(actionsReducer(reducer), initialState, enhancer);

  const replaceReducer = (reducer) => {
    return store.replaceReducer(actionsReducer(reducer));
  };

  return {
    ...store,
    replaceReducer,
  };
};
