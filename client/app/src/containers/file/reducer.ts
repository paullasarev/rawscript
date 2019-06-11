import { AnyAction } from 'redux';
import { requestsReducer } from 'redux-saga-requests';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  pipeReducers,
  getDefaultApiState,
  getDataByArraySchema,
  getDataBySchema,
  getDefaultsByArraySchema,
  getDefaultsBySchema,
  defaultReducer,
  combinePartialReducers,
  ApiState,
} from '../../common/composite';
import pathSchema from '../../models/path.schema';
import { Path } from '../../models/path.d';
import fileSchema from '../../models/file.schema';
import { File } from '../../models/file.d';
import importItemSchema from '../../models/import-item.schema';

import {
  GET_PATH_LIST,
  GET_FILE_ITEM,
  SELECT_PATH_LIST,
  SELECT_ROUTE_ITEM,
  IMPORT_ITEM,
  getPathList,
  getFileItem,
  selectRouteItem,
  selectPathList, importFiles, importItem,
} from './actions';
import { FileState } from './entities';
// import { fillDefaults } from '../../common/json-schema';
import { arraySchema } from '../../models/common';

export type State = {
  viewState: FileState,
  pathList: ApiState<Array<Path>>,
  fileItem: ApiState<File>,
  path: string,
  file: string,
  actions?: Array<any>
}

export type StateAction = ReturnType<typeof getPathList | typeof getFileItem | typeof selectPathList | typeof selectRouteItem | typeof importFiles | typeof importItem >
  // | AnyAction
;

const initialState: State = {
  viewState: FileState.NOT_SELECTED,
  pathList: getDefaultApiState<Array<Path>>(arraySchema(pathSchema)),
  fileItem: getDefaultApiState<File>(fileSchema),
  path: '',
  file: '',
};

export const section = 'file';
export type StoreState = { file: State };
export const selector = (state: StoreState) => state.file;

function baseReducer(state: State, action: StateAction): State {
  switch (action.type) {

    case SELECT_ROUTE_ITEM: {
      const viewState = FileState.PATH_LIST;
      const { path, name } = action.payload;
      const actions = [getPathList(path)];
      return {
        ...state,
        viewState,
        pathList: initialState.pathList,
        actions,
      };
    }

    case SELECT_PATH_LIST: {
      const viewState = FileState.NOT_SELECTED;
      const { isFile, isDirectory, name, folder } = action.payload;
      const paths = folder ? folder.split('/') : [];
      let path = paths.join(':');
      let actions;
      let fileName = '';
      if (isFile) {
        actions = [getFileItem(path, name)];
        fileName = name;
      } else if (isDirectory) {
        paths.push(name);
        path = paths.join(':');
        actions = [selectRouteItem(path, '')];
      } else {
        return state;
      }
      return {
        ...state,
        viewState,
        actions,
        path,
        file: fileName,
      };
    }

    default:
      return state;
  }
}

const reducer = pipeReducers<State, StateAction>(
  defaultReducer(initialState),
  combinePartialReducers({

    pathList: requestsReducer({
      actionType: GET_PATH_LIST,
      getDefaultData: getDefaultsByArraySchema(pathSchema),
      getData: getDataByArraySchema(pathSchema),
    }),
    fileItem: requestsReducer({
      actionType: GET_FILE_ITEM,
      getDefaultData: getDefaultsBySchema(fileSchema),
      getData: getDataBySchema(fileSchema),
    }),
    importItem: requestsReducer({
      actionType: IMPORT_ITEM,
      getDefaultData: getDefaultsBySchema(importItemSchema),
      getData: getDataBySchema(importItemSchema),
    }),

  }),
  baseReducer,
);

export default persistReducer<State, StateAction>({
  key: 'file',
  storage,
  whitelist: ['path', 'file'],
}, reducer);
