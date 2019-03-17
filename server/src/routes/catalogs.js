import Router from 'koa-router';
import { map, find } from 'lodash/fp';
import { resolve } from 'path';

import { fillDefaults } from '../utils/json-schema';
import catalogSchema from '../models/catalog.schema';
import { startWatcher } from '../utils/watch-folders';

import yearsRoute from './years';

const catalogs = [
  { name: 'main', folder: '/main' },
];

const fillList = map(fillDefaults(catalogSchema));
const findByName = (name) => find({name});

async function list(ctx) {
  ctx.body = fillList(catalogs);
}

async function get(ctx) {
  const name = ctx.params.catalog;
  const obj = findByName(name)(catalogs);
  if (!obj) {
    ctx.throw(404, `invalid catalog name: ${name}`);
  }

  ctx.body = obj;
}

export default function createRouter(config) {
  const { root, dataFolder } = config;
  const dataRoot = resolve(root, dataFolder);
  startWatcher(root, dataRoot, catalogs);

  const years = yearsRoute(config);

  const router = new Router();
  router.get('/', list);
  router.get('/:catalog', get);
  router.use('/:catalog/years', years.routes(), years.allowedMethods());

  return router;
}
