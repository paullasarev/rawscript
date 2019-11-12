// @flow
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
  type ApiState,
} from '../../common/composite';
import pathSchema from '../../models/path.schema';
import type { Path, PathArray } from '../../models/path.flow';
import fileSchema from '../../models/file.schema';
import type { File, FileArray } from '../../models/file.flow';
// import uploadFilesSchema from '../../models/upload-files.schema';

import {
  GET_PATH_LIST,
  GET_FILE_ITEM,
  SELECT_PATH_LIST,
  SELECT_ROUTE_ITEM,
  UPLOAD_FILES,
  getPathList,
  getFileItem,
  selectRouteItem,
  type Action, IMPORT_FILES, uploadFiles,
} from './actions';
import { FileState, type FileStateType } from './entities';
// import { fillDefaults } from '../../common/json-schema';
import { arraySchema } from '../../models/common';

export type State = {
  viewState: FileStateType,
  pathList: ApiState<PathArray>,
  fileItem: ApiState<File>,
  path: string,
  file: string,
}

const initialState: State = {
  viewState: FileState.NOT_SELECTED,
  pathList: getDefaultApiState<PathArray>(arraySchema(pathSchema)),
  fileItem: getDefaultApiState<File>(fileSchema),
  path: '',
  file: '',
};

export const section = 'file';
export type StoreState = { file: State };
export const selector = (state: StoreState) => state.file;

function baseReducer(state: State, action: Action): State {
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

    case IMPORT_FILES: {
      const { path, files } = action.payload;

      const formData = new FormData();
      for (const file of files) {
        const { lastModifiedDate, size, name } = file;
        formData.append('file', file);
        formData.append('info', { lastModifiedDate, size, name })
        console.log('add file', file)
      }

      const actions = [uploadFiles(path, formData)];
      return {
        ...state,
        actions,
      };
    }

    default:
      return state;
  }
}

const reducer = pipeReducers<State, Action>(
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
    // uploadFiles: requestsReducer({
    //   actionType: UPLOAD_FILES,
    //   getDefaultData: getDefaultsBySchema(uploadFilesSchema),
    //   getData: getDataBySchema(uploadFilesSchema),
    // }),

  }),
  baseReducer,
);

export default persistReducer<State, Action>({
  key: 'file',
  storage,
  whitelist: ['path', 'file'],
}, reducer);
