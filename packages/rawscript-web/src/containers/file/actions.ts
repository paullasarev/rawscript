// @flow
import type { Path } from '../../models/path.flow';
import type { File } from '../../models/file.flow';
import type { ReturnType } from '../../common/types';

export const GET_PATH_LIST = 'GET_PATH_LIST';
export const GET_FILE_ITEM = 'GET_FILE_ITEM';
export const SELECT_PATH_LIST = 'SELECT_PATH_LIST';
export const SELECT_ROUTE_ITEM = 'SELECT_ROUTE_ITEM';
export const IMPORT_FILES = 'IMPORT_FILES';

export function getPathList(path: string) {
  return {
    type: GET_PATH_LIST,
    request: {
      url: `/paths/${path}`,
    },
    meta: {
      path,
    },
  };
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
  };
}

export function selectPathList(item: Path) {
  return {
    type: SELECT_PATH_LIST,
    payload: item,
  };
}

export function selectRouteItem(path: string, name: string) {
  return {
    type: SELECT_ROUTE_ITEM,
    payload: {
      path,
      name,
    },
  };
}

export function importFiles(path: string, files: FileList) {
  return {
    type: IMPORT_FILES,
    payload: {
      path,
      files,
    },
  };
}

export const UPLOAD_FILES = 'UPLOAD_FILES';
export function uploadFiles(path: string, formData: FormData) {
  return {
    type: UPLOAD_FILES,
    request: {
      url: `/upload/${path}`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  };
}

export type Action =
  | ReturnType<typeof getPathList>
  | ReturnType<typeof getFileItem>
  | ReturnType<typeof selectPathList>
  | ReturnType<typeof selectRouteItem>
  | ReturnType<typeof importFiles>
  | ReturnType<typeof importItem>
  | ReturnType<typeof uploadFiles>
;
