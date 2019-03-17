// @flow
export const FileState = {
  NOT_SELECTED: 'NOT_SELECTED',
  CATALOG_LIST: 'CATALOG_LIST',
  YEAR_LIST: 'YEAR_LIST',
  DAY_LIST: 'DAY_LIST',
  FOTO_LIST: 'FOTO_LIST',
};

export type FileStateType = $Keys<typeof FileState>;
