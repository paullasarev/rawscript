import { stringSchema, numberSchema, requiredSchema } from './common';

const schema = requiredSchema({
  type: 'object',
  id: 'File',
  properties: {
    name: stringSchema,
    ext: stringSchema,
    folder: stringSchema,
    ctime: stringSchema,
    mtime: stringSchema,
    size: numberSchema,
  },
});

export default schema;
