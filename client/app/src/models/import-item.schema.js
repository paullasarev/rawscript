import { requiredSchema } from './common';
import pathSchema from './path.schema';
import fileSchema from './file.schema';

const schema = requiredSchema({
  type: 'object',
  id: 'Import',
  properties: {
    path: pathSchema,
    file: fileSchema,
  },
});

export default schema;
