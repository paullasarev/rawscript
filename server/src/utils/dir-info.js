import { readdir } from 'fs';
import { resolve, relative, sep, basename } from 'path';
import { promisify } from 'util';

import { readDir } from './read-dir';

const readdirP = promisify(readdir);

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

