import Router from 'koa-router';

import pkginfo from '../../package.json';

import pathsRoute from './paths';
import uploadRoute from './upload';

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
};

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
  const router = new Router({
    prefix: config.get('API_PREFIX'),
  });

  const paths = pathsRoute(config);
  const upload = uploadRoute(config);

  addInfo(router);
  router.use('/paths', paths.routes(), paths.allowedMethods());
  router.use('/upload', upload.routes(), paths.allowedMethods());

  return router;
}
