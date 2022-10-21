import { stringSchema, numberSchema } from './common.js';

const schema = {
  type: 'object',
  id: 'Foto',
  properties: {
    name: stringSchema,
    ext: stringSchema,
    folder: stringSchema,
    ctime: stringSchema,
    mtime: stringSchema,
    size: numberSchema,
  },
  required: ['name', 'ext', 'folder', 'ctime', 'mtime', 'size'],
};

export default schema;
