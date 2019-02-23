import { combineReducers } from 'redux';

import app from './reducer';
import console from '../containers/console/reducer';
import script from '../containers/script/reducer';
import edit from '../containers/edit/reducer';

const rootReducer = combineReducers({
  app,
  console,
  script,
  edit,
});

export default rootReducer;
