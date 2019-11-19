import multer from 'fastify-multer';

import { makePath } from '../utils/path';
import { uploadFiles } from './upload-files';

const post = (uploadFolder, dataFolder) => async (request, reply) => {
  const path = makePath(request.params.path);
  const files = request.files;
  try {
    const result = await uploadFiles(uploadFolder, dataFolder, files);
    reply.send(result);
  } catch (e) {
    reply.code(404).type('text/plain').send(e, `invalid path: ${path}`);
  }
};

export default function createRouter(config) {
  return function(fastify, opt, done) {
    const { uploadFolder, filesFolder } = config;
    const upload = multer({ dest: uploadFolder });
    fastify.register(multer.contentParser);

    fastify.route({
      method: 'POST',
      url: '/:path',
      preHandler: upload.array('file'),
      handler: post(uploadFolder, filesFolder),
    });

    done();
  }
}
