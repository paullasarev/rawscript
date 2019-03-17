import { stringSchema, numberSchema } from './common';

const schema = {
  type: 'object',
  id: 'Day',
  properties: {
    name: stringSchema,
    folder: stringSchema,
    count: numberSchema,
  },
  required: ['name', 'folder'],
};

export default schema;
