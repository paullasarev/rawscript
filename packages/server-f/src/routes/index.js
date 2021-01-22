import pathsRoute from './paths';
import uploadRoute from './upload';

export default function createRoute(config) {
  return function (fastify, opts, done) {

    const paths = pathsRoute(config);
    const upload = uploadRoute(config);

    fastify.register(paths, { prefix: '/paths' });
    fastify.register(upload, { prefix: '/upload' });

    done();
  }
}
