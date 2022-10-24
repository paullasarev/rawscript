import pathsRoute from './paths.js';
import uploadRoute from './upload.js';
import filesRoute from './files.js';

export default function createRoutes(config) {
  return function (fastify, opts, done) {

    fastify.register(pathsRoute(config), { prefix: '/paths' });
    fastify.register(uploadRoute(config), { prefix: '/upload' });
    fastify.register(filesRoute(config), { prefix: '/file' });

    done();
  }
}
