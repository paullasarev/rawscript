import { createStore /* , applyMiddleware */ } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import rootSaga from './root-saga'
import rootReducer from './root-reducer';

export default function configureStore() {
  return createStore(rootReducer);
  // const sagaMiddleware = createSagaMiddleware({ rootSaga });
  // return {
  //   ...createStore(rootReducer),
  // ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
  // runSaga: sagaMiddleware.run,
  // };
}
