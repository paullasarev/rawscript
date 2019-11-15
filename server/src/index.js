import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import koaSwagger from 'koa2-swagger-ui';
import koaStatic from 'koa-static';
import { join } from 'path';

import swaggerSpec from '../swagger.json';

import createRoutes from './routes/index';
import configure  from './configure';

const dataFolder = process.env.DATA_FOLDER;
const config = configure(`config.${process.env.NODE_ENV || 'development'}.env`);

const app = new Koa();
const router = createRoutes(config);
const port = config.get('API_PORT');

const staticDir = join(__dirname, '..', '..', 'client', 'dist');
app
  .use(cors())
  .use(logger())
  .use(koaSwagger({
    routePrefix: '/docs', // host at /swagger instead of default /docs
    swaggerOptions: {
      // url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
      spec: swaggerSpec,
    },
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(staticDir, {}))
;

console.log('the server is started');
console.log( { port, dataFolder });

app.listen(port);
