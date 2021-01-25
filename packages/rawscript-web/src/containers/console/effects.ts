import { fork, take } from 'redux-saga/effects';
import { CONSOLE_RUN } from './actions';

export function* runConsole() {
  while (true) {
    const action = yield take(CONSOLE_RUN);
    console.log('runConsole', action); // eslint-disable-line no-console
  }
}

export function* consoleSagas() {
  yield fork(runConsole);
}
