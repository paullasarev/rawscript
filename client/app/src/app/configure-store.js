import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';


import rootSaga from './effects';
import rootReducer from './root-reducer';

function logMiddleware({ getState }) {
  return next => (action) => {
    console.log({ [action.type]: { action: action.payload, state: getState() } });
    return next(action);
  };
}

const isDev = process.env.NODE_ENV !== 'production';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware({ rootSaga });
middlewares.push(sagaMiddleware);
if (isDev) {
  middlewares.push(logMiddleware);
}

let enhancer = applyMiddleware(...middlewares);
if (isDev) {
  enhancer = composeWithDevTools(enhancer);
}

export default function configureStore() {
  // return createStore(rootReducer, applyMiddleware(...middlewares));
  // const sagaMiddleware = createSagaMiddleware({ rootSaga });
  return {
    ...createStore(rootReducer),
    // ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    ...createStore(rootReducer, enhancer),
    runSaga: sagaMiddleware.run,
  };
}
