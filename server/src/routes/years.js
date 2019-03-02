import Router from 'koa-router';
import { map } from 'lodash/fp';
import { fillDefaults } from '../utils/json-schema';
import { yearSchema } from '../models/year';
import { readDir } from '../utils/read-dir';
import { resolve } from 'path';
import { dirInfo } from '../utils/dir-info';

const fillYear = fillDefaults(yearSchema)
const fillList = map(fillYear);

const list = (root, dataRoot) => async (ctx) => {
  const data = [];
  const catalog = ctx.params.catalog;
  const catalogRoot = resolve(dataRoot, catalog);
  await readDir(root, catalogRoot, data);
  ctx.body = fillList(data);
}

const get = (root, dataRoot) => async (ctx) => {
  const catalog = ctx.params.catalog;
  const year = ctx.params.year;
  const yearRoot = resolve(dataRoot, catalog, year);
  const obj = await dirInfo(root, yearRoot);

  if (!obj) {
    ctx.throw(404, `invalid year: ${name}`);
  }

  ctx.body = fillYear(obj);
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);

  const router = new Router();
  router.get('/', list(root, dataRoot));
  router.get('/:year', get(root, dataRoot));
  return router;
}
