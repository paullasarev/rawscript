// @flow
export const FileState = {
  NOT_SELECTED: 'NOT_SELECTED',
  CATALOG_LIST: 'CATALOG_LIST',
};

export type FileStateType = $Keys<typeof FileState>;
