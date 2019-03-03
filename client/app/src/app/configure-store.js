import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createActionsEnhancer } from '../common/action-enhancer';

import rootReducer from './root-reducer';
import rootSaga from './effects';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['edit', 'sidePanel'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

function logMiddleware({ getState }) {
  return next => (action) => {
    const result = next(action);
    console.log({ [action.type]: { action, state: getState() } });
    return result;
  };
}

const isDev = process.env.NODE_ENV !== 'production';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
const actionEnchancer = createActionsEnhancer(sagaMiddleware);

middlewares.push(sagaMiddleware);
if (isDev) {
  middlewares.push(logMiddleware);
}

let enhancer = applyMiddleware(...middlewares);
if (isDev) {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(persistedReducer,
  compose(actionEnchancer, enhancer));

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default function configureStore() {
  return {
    store: {
      ...store,
      runSaga: sagaMiddleware.run,
    },
    persistor,
  };
}
