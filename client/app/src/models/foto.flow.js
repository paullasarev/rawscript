/* @flow */
export type Foto = {
  name: string,
  ext: string,
  folder: string,
  ctime: string,
  mtime: string,
  size: number,
};

export type FotoArray = Array<Foto>;
