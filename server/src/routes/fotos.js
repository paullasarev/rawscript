import Router from 'koa-router';
import { map } from 'lodash/fp';
import { fillDefaults } from '../utils/json-schema';
import { readDir } from '../utils/read-dir';
import { resolve } from 'path';
import fotoSchema from '../models/foto.schema';
import { fileInfo } from '../utils/file-info';

const fillEntry = fillDefaults(fotoSchema);
const fillList = map(fillEntry);

const list = (root, dataRoot) => async (ctx) => {
  const data = [];
  const catalog = ctx.params.catalog;
  const year = ctx.params.year;
  const day = ctx.params.day;
  const listRoot = resolve(dataRoot, catalog, year, day);
  await readDir(root, listRoot, data);
  ctx.body = fillList(data);
}

const get = (root, dataRoot) => async (ctx) => {
  const catalog = ctx.params.catalog;
  const { year, day, foto } = ctx.params;
  const entryRoot = resolve(dataRoot, catalog, year, day, foto);
  const obj = await fileInfo(root, entryRoot);

  if (!obj) {
    ctx.throw(404, `invalid foto: ${name}`);
  }

  ctx.body = fillEntry(obj);
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);

  const router = new Router();
  router.get('/', list(root, dataRoot));
  router.get('/:foto', get(root, dataRoot));
  return router;
}
