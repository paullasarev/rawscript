import { combineReducers } from 'redux';

import app from './reducer';
import console from '../containers/console/reducer';
import script from '../containers/script/reducer';
import edit from '../containers/edit/reducer';
import file from '../containers/file/reducer';
import sidePanel from '../containers/side-panel/reducer';

const rootReducer = combineReducers({
  app,
  console,
  script,
  edit,
  file,
  sidePanel,
});

export default rootReducer;
