import { spawn } from 'redux-saga/effects';
import { consoleSagas } from '../containers/console/effects';

export default function* rootSaga() {
  yield spawn(consoleSagas);
}
