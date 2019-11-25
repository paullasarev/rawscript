import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createMiddleware } from 'redux-fetch-requests';

import { createActionsEnhancer } from '../common/action-enhancer';

import rootReducer from './root-reducer';
// import rootSaga from './effects';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['edit', 'sidePanel'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  collapsed: true,
});

const isDev = true; // process.env.NODE_ENV !== 'production';

const middlewares = [];
// const sagaMiddleware = createSagaMiddleware();
const actionEnchancer = createActionsEnhancer({ log: console.log.bind(console) }); // eslint-disable-line no-console

// middlewares.push(sagaMiddleware);
middlewares.push(createMiddleware({
  baseUrl: '/api',
}));
if (isDev) {
  middlewares.push(logger);
}

let enhancer = applyMiddleware(...middlewares);
if (isDev) {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(persistedReducer,
  compose(actionEnchancer, enhancer));

const persistor = persistStore(store);
// sagaMiddleware.run(rootSaga);

export default function configureStore() {
  return {
    store,
    // store: {
    //   ...store,
    //   runSaga: sagaMiddleware.run,
    // },
    persistor,
  };
}
