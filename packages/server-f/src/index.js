import 'dotenv/config';
import fastify from 'fastify';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';
import fastStatic from 'fastify-static';
import { join, resolve } from 'path';

import createRoutes from './routes/index';
import configure  from './configure';

const config = configure(`config.${process.env.NODE_ENV || 'development'}.env`);
const dataFolder = config.dataFolder;

const app = fastify({
  logger: true
});
const port = config.get('API_PORT');


app.register(cors,{});

app.register(swagger, {
    routePrefix: '/api/doc', // host at /swagger instead of default /docs
    exposeRoute: true,
    swagger: {
      info: {
        title: 'rawscript API',
        description: 'rawscript API',
        version: '1.0.2',
      },
    },
});

app.register(createRoutes(config), {
  prefix: config.get('API_PREFIX')
});

app.ready(err => {
  if (err) throw err;
  app.swagger();
  console.log('app.swagger', app.swagger)
});

const staticDir = join(__dirname, '..', '..', 'client', 'dist');
app.register(fastStatic, {
  root: staticDir,
  wildcard: false,
});
app.get('/*', function (req, reply) {
  reply.sendFile('index.html');
});

console.log('the server is started');
console.log( { port, dataFolder });

app.listen(port);
