import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import koaSwagger from 'koa2-swagger-ui';

import pkginfo from '../package.json';
import swaggerSpec from '../swagger.json';

const PORT = 3030;

const dataFolder = process.env.DATA_FOLDER;
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


var app = new Koa();
var router = new Router();

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

app
.use(koaSwagger({
    routePrefix: '/docs', // host at /swagger instead of default /docs
    swaggerOptions: {
      // url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
      spec: swaggerSpec,
    },
  }))
  .use(router.routes())
  .use(router.allowedMethods());

console.log('the server is started');
console.log( { PORT, dataFolder });
  
app.listen(PORT);
