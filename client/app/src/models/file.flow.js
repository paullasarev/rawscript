/* @flow */
export type File = {
  name: string,
  ext: string,
  folder: string,
  ctime: string,
  mtime: string,
  size: number,
};

export type FileArray = Array<File>;
