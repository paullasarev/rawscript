// @flow
export const FileState = {
  NOT_SELECTED: 'NOT_SELECTED',
  PATH_LIST: 'PATH_LIST',
};

export type FileStateType = $Keys<typeof FileState>;
