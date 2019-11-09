import { relative, sep, basename } from 'path';

import { readDir } from './read-dir';

export async function dirInfo(baseRoot, root) {
  const data = [];
  const folderName = relative(baseRoot, root);
  const folder = folderName.split(sep).join('/');
  const name = basename(root);
  await readDir(baseRoot, root, data);
  return {
    name,
    folder,
    count: data.length,
  };
}

