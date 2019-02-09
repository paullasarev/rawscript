import { spawn } from 'redux-saga/effects';
import { consoleSagas } from '../components/console/effects';

export default function* rootSaga() {
  yield spawn(consoleSagas);
}
