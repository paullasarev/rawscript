import Router from 'koa-router';
import { map, compose } from 'lodash/fp';
import { resolve } from 'path';

import { fillDefaults } from '../utils/json-schema';
import pathSchema from '../models/path.schema';
import fotoSchema from '../models/foto.schema';
import { readDirWithTypes } from '../utils/read-dir';
import { fileInfo } from '../utils/file-info';
import { makePath } from '../utils/path';

const fillEntry = fillDefaults(pathSchema)
const fillList = compose(
  map(fillEntry),
  map(({dirent, folder})=>({
    folder,
    name: dirent.name,
    isFile: dirent.isFile(),
    isDirectory: dirent.isDirectory(),
  }))
);
const fotoFillEntry = fillDefaults(fotoSchema);

const list = (dataRoot) => async (ctx) => {
  const data = [];
  const path = makePath(ctx.params.path);
  const pathRoot = resolve(dataRoot, path);
  try {
    await readDirWithTypes(dataRoot, pathRoot, data);
    ctx.body = fillList(data);
  } catch (e) {
    ctx.throw(404, `invalid path: ${path}`);
  }
};

const get = (rootFolder, dataRoot) => async (ctx) => {
  const { path: paramPath, file } = ctx.params;
  const path = makePath(paramPath);
  if (!path) {
    return;
  }
  const entryRoot = resolve(dataRoot, path, file);
  try {
    const obj = await fileInfo(rootFolder, entryRoot);
    if (!obj) {
      throw new Error();
    }
    ctx.body = fotoFillEntry(obj);
  } catch (e) {
    ctx.throw(404, `invalid file: ${name}`);
  }
};

export default function createRouter(config) {
  const { rootFolder, dataFolder } = config;
  const dataRoot = resolve(dataFolder);

  const router = new Router();
  router.get('/', list(dataRoot));
  router.get('/:path', list(dataRoot));
  router.get('/:path/:file', get(rootFolder, dataRoot));

  return router;
}
