import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import rootSaga from './root-saga'
import rootReducer from './root-reducer';

function logMiddleware({ getState }) {
  // return next => action =>
  //   typeof action === 'function' ?
  //     action(dispatch, getState) :
  //     next(action);
  // }
  return next => (action) => {
    console.log(action, getState());
    return next(action);
  };
}

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(logMiddleware));
  // const sagaMiddleware = createSagaMiddleware({ rootSaga });
  // return {
  //   ...createStore(rootReducer),
  // ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
  // runSaga: sagaMiddleware.run,
  // };
}
