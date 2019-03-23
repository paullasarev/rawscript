import { stringSchema, requiredSchema, booleanSchema } from './common';

const schema = requiredSchema({
  type: 'object',
  id: 'Path',
  properties: {
    name: stringSchema,
    folder: stringSchema,
    isDirectory: booleanSchema,
    isFile: booleanSchema,
  },
});

export default schema;
