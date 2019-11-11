/* @flow */
export type Import = {
  path: {
    name: string,
    folder: string,
    isDirectory: boolean,
    isFile: boolean,
  },
  files: Array<{
    name: string,
    ext: string,
    folder: string,
    ctime: string,
    mtime: string,
    size: number,
  }>,
};

export type ImportArray = Array<Import>;
