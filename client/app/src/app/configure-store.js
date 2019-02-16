import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './effects';
import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['edit'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

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

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store)

export default function configureStore() {
  // return createStore(rootReducer, applyMiddleware(...middlewares));
  // const sagaMiddleware = createSagaMiddleware({ rootSaga });
  return {
    store: {
    // ...createStore(rootReducer),
    // ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
      ...store,
      runSaga: sagaMiddleware.run,
    },
    persistor,
  };
}
