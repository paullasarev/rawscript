import { spawn } from 'redux-saga';
import { consoleSagas } from '../components/console/effects';

export default function* rootSaga() {
  yield spawn(consoleSagas);
}
