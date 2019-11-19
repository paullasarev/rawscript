import { stat } from 'fs';
import { relative, sep, basename, extname } from 'path';
import { promisify } from 'util';

const statP = promisify(stat);

export async function fileInfo(baseRoot, root) {
  const folderName = relative(baseRoot, root);
  const folder = folderName.split(sep).join('/');
  const name = basename(root);
  const ext = extname(root);
  const fsStats = await statP(root);
  const { size, ctime, mtime } = fsStats;
  return {
    name,
    ext,
    folder,
    size,
    ctime,
    mtime,
  };
}

