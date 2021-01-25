import { spawn } from 'redux-saga/effects';
// import { createRequestInstance, watchRequests } from 'redux-saga-requests';
// import { createDriver } from 'redux-saga-requests-axios';
// import axios from 'axios';

import { consoleSagas } from '../containers/console/effects';

// const axiosInstance = axios.create({
//   // baseURL: 'http://localhost:3030',
//   baseURL: '/api',
// });

export default function* rootSaga() {
  // yield createRequestInstance({ driver: createDriver(axiosInstance) });
  // yield spawn(watchRequests);
  yield spawn(consoleSagas);
}
