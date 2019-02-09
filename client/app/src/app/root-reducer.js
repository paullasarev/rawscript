import { combineReducers } from 'redux';

import app from './reducer';
import console from '../components/console/reducer';
import script from '../components/script/reducer';

const rootReducer = combineReducers({
  app,
  console,
  script,
});

export default rootReducer;
