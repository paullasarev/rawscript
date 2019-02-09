import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './effects';
import rootReducer from './root-reducer';

function logMiddleware({ getState }) {
  return next => (action) => {
    console.log(action, getState());
    return next(action);
  };
}

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logMiddleware);
}

export default function configureStore() {
  // return createStore(rootReducer, applyMiddleware(...middlewares));
  const sagaMiddleware = createSagaMiddleware({ rootSaga });
  return {
    ...createStore(rootReducer),
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run,
  };
}
