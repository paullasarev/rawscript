import { fork, take } from 'redux-saga';
import { CONSOLE_RUN } from './actions';

export function* runConsole() {
  while (true) {
    const action = yield take(CONSOLE_RUN);
    console.log('run', action);
  }
}


export function* consoleSagas() {
  yield fork(runConsole);
}
