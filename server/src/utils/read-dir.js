import { readdir } from 'fs';
import { resolve, relative, sep } from 'path';
import { promisify } from 'util';

const readdirP = promisify(readdir);

export async function readDir(baseRoot, root, data) {
  const names = await readdirP(root);
  data.length = 0;
  names.forEach(name => {
    const folderName = relative(baseRoot, resolve(root, name));
    const folder = folderName.split(sep).join('/');
    data.push({ name, folder  })
  });
}
