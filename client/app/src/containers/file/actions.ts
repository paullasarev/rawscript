import { Path } from '../../models/path.d';
import { File } from '../../models/file.d';
// import type { ReturnType } from '../../common/types';

// export enum FileActionType {
//   GET_PATH_LIST = 'FileAction.GET_PATH_LIST',
//   GET_FILE_ITEM = 'FileAction.GET_FILE_ITEM',
//   SELECT_PATH_LIST = 'FileAction.SELECT_PATH_LIST',
//   SELECT_ROUTE_ITEM = 'FileAction.SELECT_ROUTE_ITEM',
//   IMPORT_FILES = 'FileAction.IMPORT_FILES',
//   IMPORT_ITEM = 'FileAction.IMPORT_ITEM',
// }

export const GET_PATH_LIST = 'GET_PATH_LIST';
export const GET_FILE_ITEM = 'GET_FILE_ITEM';
export const SELECT_PATH_LIST = 'SELECT_PATH_LIST';
export const SELECT_ROUTE_ITEM = 'SELECT_ROUTE_ITEM';
export const IMPORT_FILES = 'IMPORT_FILES';
export const IMPORT_ITEM = 'IMPORT_ITEM';

export function getPathList(path: string) {
  return {
    type: GET_PATH_LIST,
    request: {
      url: `/paths/${path}`,
    },
    meta: {
      path,
    },
  } as const;
}

export function getFileItem(path: string, file: string) {
  return {
    type: GET_FILE_ITEM,
    request: {
      url: `/paths/${path}/${file}`,
    },
    meta: {
      path,
      file,
    },
  } as const;
}

export function selectPathList(item: Path) {
  return {
    type: SELECT_PATH_LIST,
    payload: item,
  } as const;
}

export function selectRouteItem(path: string, name: string) {
  return {
    type: SELECT_ROUTE_ITEM,
    payload: {
      path,
      name,
    },
  } as const;
}

export function importFiles(files: FileList) {
  return {
    type: IMPORT_FILES,
    payload: {
      files,
    },
  } as const;
}

export function importItem(path: string, file: string) {
  return {
    type: IMPORT_ITEM,
    request: {
      url: `/import/${path}/${file}`,
    },
    meta: {
      path,
      file,
    },
  } as const;
}

// export type StateAction = ReturnType<
//   typeof getPathList
//   | typeof selectPathList
//   | typeof getFileItem
//   | typeof selectRouteItem
//   | typeof importFiles
//   | typeof importItem >
//   ;
