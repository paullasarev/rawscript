import Router from 'koa-router';
import { map } from 'lodash/fp';
import { fillDefaults } from '../utils/json-schema';
import { readDir } from '../utils/read-dir';
import { resolve } from 'path';
import { dirInfo } from '../utils/dir-info';
import { daySchema } from '../models/day.schema';

import fotosRoute from './fotos';

const fillEntry = fillDefaults(daySchema);
const fillList = map(fillEntry);

const list = (root, dataRoot) => async (ctx) => {
  const data = [];
  const catalog = ctx.params.catalog;
  const year = ctx.params.year;
  const listRoot = resolve(dataRoot, catalog, year);
  await readDir(root, listRoot, data);
  ctx.body = fillList(data);
}

const get = (root, dataRoot) => async (ctx) => {
  const catalog = ctx.params.catalog;
  const year = ctx.params.year;
  const day = ctx.params.day;
  const entryRoot = resolve(dataRoot, catalog, year, day);
  const obj = await dirInfo(root, entryRoot);

  if (!obj) {
    ctx.throw(404, `invalid day: ${name}`);
  }

  ctx.body = fillEntry(obj);
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);

  const fotos = fotosRoute(config);

  const router = new Router();
  router.get('/', list(root, dataRoot));
  router.get('/:day', get(root, dataRoot));
  router.use('/:day/fotos', fotos.routes(), fotos.allowedMethods());
  return router;
}
