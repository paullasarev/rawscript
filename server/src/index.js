import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import koaSwagger from 'koa2-swagger-ui';
import { resolve } from 'path';

import swaggerSpec from '../swagger.json';

import createRoutes from './routes/index';

const PORT = 3030;

const dataFolder = process.env.DATA_FOLDER;
const config = {
  root: resolve(__dirname, '..'),
  dataFolder,
};

const app = new Koa();
const router = createRoutes(config);

app
  .use(logger())
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
