import Router from 'koa-router';
import { map, compose } from 'lodash/fp';
import { resolve } from 'path';

import { fillDefaults } from '../utils/json-schema';
import pathSchema from '../models/path.schema';
import fotoSchema from '../models/foto.schema';
import { readDirWithTypes } from '../utils/read-dir';
import { fileInfo } from '../utils/file-info';

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

function makePath(path = '') {
  path = path.replace(/::+/g, ':');
  path = path.replace(/(^:+)|(:+$)/g, '');
  return path.split(':').join('/');
}

const list = (root, dataRoot) => async (ctx) => {
  const data = [];
  const path = makePath(ctx.params.path);
  // if (!path) {
  //   ctx.body = [];
  //   return;
  // }
  const pathRoot = resolve(dataRoot, path);
  try {
    await readDirWithTypes(dataRoot, pathRoot, data);
  } catch (e) {
    ctx.throw(404, `invalid path: ${path}`);
  }
  ctx.body = fillList(data);
}

const get = (root, dataRoot) => async (ctx) => {
  const { path: paramPath, file } = ctx.params;
  const path = makePath(paramPath);
  if (!path) {
    return;
  }
  const entryRoot = resolve(dataRoot, path, file);
  const obj = await fileInfo(root, entryRoot);

  if (!obj) {
    ctx.throw(404, `invalid file: ${name}`);
  }

  ctx.body = fotoFillEntry(obj);
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);

  const router = new Router();
  router.get('/', list(root, dataRoot));
  router.get('/:path', list(root, dataRoot));
  router.get('/:path/:file', get(root, dataRoot));

  return router;
}
