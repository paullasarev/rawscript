import { fork, take } from 'redux-saga/effects';
import { CONSOLE_RUN } from './actions';

export function* runConsole() {
  while (true) {
    const action = yield take(CONSOLE_RUN);
    console.log('runConsole', action);
  }
}


export function* consoleSagas() {
  yield fork(runConsole);
}
