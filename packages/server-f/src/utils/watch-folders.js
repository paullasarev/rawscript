import { watch } from 'fs';

import { readDir } from './read-dir';

export const watchFolders = (baseRoot, root, data) => (eventType, fileName) => {
  readDir(baseRoot, root, data);
}

export async function startWatcher(baseRoot, root, data) {
  try {
    await readDir(baseRoot, root, data);
    watch(root, {
      recursive: false,
      persistent: true,
      }, watchFolders(baseRoot, root, data));
  } catch(error) {
    console.error('startWatcher', { root, error})
  }
}

