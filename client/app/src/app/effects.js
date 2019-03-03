import { spawn, fork } from 'redux-saga/effects';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import axios from 'axios';

import { consoleSagas } from '../containers/console/effects';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
});

export default function* rootSaga() {
  yield spawn(consoleSagas);
  yield createRequestInstance({ driver: createDriver(axiosInstance) });
  yield spawn(watchRequests);
  // yield watchRequests();
}
