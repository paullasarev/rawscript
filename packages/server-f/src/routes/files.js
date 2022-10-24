import { resolve, parse } from 'path';
import { createReadStream } from 'fs';

// import { fileInfo } from '../utils/file-info.js';
import { makePath } from '../utils/path.js';
import { objectSchema, stringSchema } from '../models/common.js';

const get = (rootFolder, dataRoot) => (request, reply) => {
    const { path: paramPath } = request.params;
    const path = makePath(paramPath);
    if (!path) {
      return;
    }
    const filePath = resolve(dataRoot, path);
    const { dir, base } = parse(filePath);
    try {
      reply.sendFile(base, dir);
    } catch (e) {
      reply.code(404).type('text/plain').send(`invalid file: ${path}`);
    }
  };

  export default function createRouter(config) {
    return function (fastify, opts, done) {
      const { rootFolder, filesFolder } = config;

      fastify.get('/:path', {
        schema: {
          params: objectSchema({
            path: stringSchema,
          }),
        },
      }, get(rootFolder, filesFolder));

      done();
    }
  }