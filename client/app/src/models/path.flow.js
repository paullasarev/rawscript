/* @flow */
export type Path = {
  name: string,
  folder: string,
  isDirectory: boolean,
  isFile: boolean,
};

export type PathArray = Array<Path>;
