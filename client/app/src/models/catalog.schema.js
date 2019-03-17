import { stringSchema } from './common';

const schema = {
  type: 'object',
  id: 'Catalog',
  properties: {
    name: stringSchema,
    folder: stringSchema,
  },
  required: ['name', 'folder'],
};

export default schema;
