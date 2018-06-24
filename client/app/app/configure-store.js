import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import rootSaga from './root-saga'
import rootReducer from './root-reducer';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  // function logMiddleware({ getState }) {
  //   return next => (action) => {
  //     console.log(action, getState());
  //     return next(action);
  //   };
  // }
  middlewares.push(({ getState }) => {
    return next => (action) => {
      console.log(action, getState());
      return next(action);
    };
  });
}

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares));
  // const sagaMiddleware = createSagaMiddleware({ rootSaga });
  // return {
  //   ...createStore(rootReducer),
  // ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
  // runSaga: sagaMiddleware.run,
  // };
}
