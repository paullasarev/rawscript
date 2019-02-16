import { combineReducers } from 'redux';

import app from './reducer';
import console from '../components/console/reducer';
import script from '../components/script/reducer';
import edit from '../components/edit/reducer';

const rootReducer = combineReducers({
  app,
  console,
  script,
  edit,
});

export default rootReducer;
