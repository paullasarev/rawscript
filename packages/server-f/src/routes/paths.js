import { map, compose } from 'lodash/fp';
import { resolve } from 'path';

import { fillDefaults } from '../utils/json-schema';
import pathSchema from '../models/path.schema';
import fotoSchema from '../models/foto.schema';
import { readDirWithTypes } from '../utils/read-dir';
import { fileInfo } from '../utils/file-info';
import { makePath } from '../utils/path';
import { arraySchema } from '../models/common';

const fillEntry = fillDefaults(pathSchema)
const fillList = compose(
  map(fillEntry),
  map(({dirent, folder})=>({
    folder,
    name: dirent.name,
    isFile: dirent.isFile(),
    isDirectory: dirent.isDirectory(),
  }))
);
const fotoFillEntry = fillDefaults(fotoSchema);

const list = (dataRoot) => async (request, reply) => {
  const data = [];
  const path = makePath(request.params.path) || '';
  const pathRoot = resolve(dataRoot, path);
  try {
    await readDirWithTypes(dataRoot, pathRoot, data);
    const result = fillList(data);
    reply.send(result);
  } catch (e) {
    reply.code(404).type('text/plain').send(`invalid path: ${path}`);
  }
};

const get = (rootFolder, dataRoot) => async (request, reply) => {
  const { path: paramPath, file } = request.params;
  const path = makePath(paramPath);
  if (!path) {
    return;
  }
  const entryRoot = resolve(dataRoot, path, file);
  try {
    const obj = await fileInfo(rootFolder, entryRoot);
    reply.send(fotoFillEntry(obj));
  } catch (e) {
    reply.code(404).type('text/plain').send(`invalid file: ${name}`);
  }
};

export default function createRouter(config) {
  return function (fastify, opts, done) {
    const { rootFolder, filesFolder } = config;

    fastify.get('/', {
      schema: {
        response: {
          200: arraySchema(pathSchema),
        },
      },
    }, list(filesFolder));

    fastify.get('/:path', {
      schema: {
        response: {
          200: arraySchema(pathSchema),
        },
      },
    }, list(filesFolder));

    fastify.get('/:path/:file', {
      schema: {
        response: {
          200: fotoSchema,
        },
      },
    }, get(rootFolder, filesFolder));

    done();
  }
}
