import type { Path } from '../../models/path';

export const GET_PATH_LIST = 'GET_PATH_LIST';
export const GET_FILE_ITEM = 'GET_FILE_ITEM';
export const GET_FILE_CONTENT = 'GET_FILE_CONTENT';
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

export function getFileContent(path: string, file: string) {
  return {
    type: GET_FILE_CONTENT,
    request: {
      url: `/file/${path}:${file}`,
    },
    meta: {
      path,
      file,
    },
  } as const;
}

export function getFileByPathContent(path: string) {
  return {
    type: GET_FILE_CONTENT,
    request: {
      url: `/file/${path}`,
    },
    meta: {
      path,
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

export function importFiles(path: string, files: FileList) {
  return {
    type: IMPORT_FILES,
    payload: {
      path,
      files,
    },
  } as const;
}

export const UPLOAD_FILES = 'UPLOAD_FILES';
export function uploadFiles(path: string, formData: FormData) {
  return {
    type: UPLOAD_FILES,
    request: {
      url: `/upload/${path}`,
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    },
  } as const;
}

export type Action =
  | ReturnType<typeof getPathList>
  | ReturnType<typeof getFileItem>
  | ReturnType<typeof getFileContent>
  | ReturnType<typeof getFileByPathContent>
  | ReturnType<typeof selectPathList>
  | ReturnType<typeof selectRouteItem>
  | ReturnType<typeof importFiles>
  | ReturnType<typeof uploadFiles>;
