// import { requestsReducer } from 'redux-saga-requests';
// @ts-ignore
import { requestsReducer, makeSuccessType } from 'redux-fetch-requests';
import { persistReducer } from 'redux-persist';
import { AnyAction, Reducer } from 'redux';
import { Dictionary } from 'lodash';
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
import type { PathArray } from '../../models/path';
import fileSchema from '../../models/file.schema';
import type { File } from '../../models/file.types';
// import uploadFilesSchema from '../../models/upload-files.schema';

import { arraySchema } from '../../models/common';
import {
  GET_PATH_LIST,
  GET_FILE_ITEM,
  GET_FILE_CONTENT,
  SELECT_PATH_LIST,
  SELECT_ROUTE_ITEM,
  getPathList,
  getFileItem,
  selectRouteItem,
  Action,
  IMPORT_FILES,
  uploadFiles,
  getFileByPathContent,
  getFileContent,
} from './actions';
import { FileState } from './entities';
// import { fillDefaults } from '../../common/json-schema';

export type State = {
  viewState: FileState;
  pathList: ApiState<PathArray>;
  fileItem: ApiState<File>;
  path: string;
  file: string;
  actions?: AnyAction[];
  fstat: Dictionary<{
    isFile: boolean,
    isDirectory: boolean,
    name: string,
    path: string,
  }>,
  fileInfo?: File,
  exif?: Dictionary<string>,
};

const initialState: State = {
  viewState: FileState.NOT_SELECTED,
  pathList: getDefaultApiState<PathArray>(arraySchema(pathSchema)),
  fileItem: getDefaultApiState<File>(fileSchema),
  path: '',
  file: '',
  fstat: {},
};

const GET_FILE_ITEM_SUCCESS = makeSuccessType(GET_FILE_ITEM);
const GET_FILE_CONTENT_SUCCESS = makeSuccessType(GET_FILE_CONTENT);
export const section = 'file';
export type StoreState = { file: State };
export const selector = (state: StoreState) => state.file;

function baseReducer(state: State, action: Action): State {
  switch (action.type) {
    case SELECT_ROUTE_ITEM: {
      const viewState = FileState.PATH_LIST;
      const { path } = action.payload;
      const fstat = state.fstat[path];
      const actions: any[] = fstat?.isFile
         ? [ getFileItem(fstat?.path, fstat?.name)]
         : [ getPathList(path)];
      if (fstat?.isFile && fstat?.name === 'info.json') {
        actions.push(getFileByPathContent(path));
      };
      return {
        ...state,
        viewState,
        pathList: initialState.pathList,
        path,
        actions,
        fileInfo: undefined,
        exif: undefined,
      };
    }

    case SELECT_PATH_LIST: {
      const viewState = FileState.NOT_SELECTED;
      const { isFile, isDirectory, name, folder } = action.payload;
      const paths = folder ? folder.split('/') : [];
      let path = paths.join(':');
      let actions: any[];
      let itemPath;
      let fileName = '';
      if (isFile) {
        actions = [getFileItem(path, name)];
        if (name === 'info.json') {
          actions.push(getFileContent(path, name));
        }
        itemPath = path;
        paths.push(name);
        path = paths.join(':');
        fileName = name;
      } else if (isDirectory) {
        paths.push(name);
        path = paths.join(':');
        itemPath = path;
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
        fstat: {
          ...state.fstat,
          [path]: { isFile, isDirectory, path: itemPath, name },
        },
        fileInfo: undefined,
      };
    }

    case IMPORT_FILES: {
      const { path, files } = action.payload;

      const formData = new FormData();
      for (const file of Array.from(files)) {
        // const { lastModifiedDate, size, name } = file;
        formData.append('file', file);
        // formData.append('info', { lastModifiedDate, size, name })
        // eslint-disable-next-line no-console
        console.log('add file', file);
      }

      const actions = [uploadFiles(path, formData)];
      return {
        ...state,
        actions,
      };
    }

    case GET_FILE_ITEM_SUCCESS: {
      const fileInfo = (action as any).data as File;
      return {
        ...state,
        fileInfo,
      };
    }

    case GET_FILE_CONTENT_SUCCESS: {
      const exif = (action as any).data?.exif;
      return {
        ...state,
        exif,
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
  baseReducer as Reducer<State, Action>,
);

export const file = persistReducer<State, Action>(
  {
    key: 'file',
    storage,
    whitelist: ['path', 'file'],
  },
  reducer,
);

export default file;
