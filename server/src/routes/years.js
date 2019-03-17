import Router from 'koa-router';
import { map } from 'lodash/fp';
import { fillDefaults } from '../utils/json-schema';
import yearSchema from '../models/year.schema';
import { readDir } from '../utils/read-dir';
import { resolve } from 'path';
import { dirInfo } from '../utils/dir-info';

import daysRoute from './days';

const fillEntry = fillDefaults(yearSchema)
const fillList = map(fillEntry);

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
  const entryRoot = resolve(dataRoot, catalog, year);
  const obj = await dirInfo(root, entryRoot);

  if (!obj) {
    ctx.throw(404, `invalid year: ${name}`);
  }

  ctx.body = fillEntry(obj);
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);

  const days = daysRoute(config);

  const router = new Router();
  router.get('/', list(root, dataRoot));
  router.get('/:year', get(root, dataRoot));
  router.use('/:year/days', days.routes(), days.allowedMethods());

  return router;
}
