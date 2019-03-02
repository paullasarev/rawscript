import Router from 'koa-router';

import pkginfo from '../../package.json';

import catalogsRoute from './catalogs';

const {
  name,
  description,
  version,
  author,
} = pkginfo;

const info = {
  name,
  description,
  version,
  author,
}

function addInfo(router) {
  /**
   * @swagger
   *
   * /:
   *   get:
   *     description: common app info
   *     produces:
   *       - application/json
   *     parameters:
   *     responses:
   *       200:
   *         description: info
   *         properties:
   *           name:
   *             type: string
   *           description:
   *             type: string
   *           version:
   *             type: string
   *           author:
   *             type: string
   */
  router.get('/', (ctx, next) => {
    ctx.body = info;
  });
}


export default function createRoute(config) {
  const router = new Router();

  const catalogs = catalogsRoute(config);

  addInfo(router);
  router.use('/catalogs', catalogs.routes(), catalogs.allowedMethods());

  return router;
}