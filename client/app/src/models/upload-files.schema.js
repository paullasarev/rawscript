import {stringSchema, numberSchema, requiredSchema, arraySchema} from './common';
import pathSchema from './path.schema';
import fileSchema from './file.schema';

const schema = requiredSchema({
  type: 'object',
  id: 'Import',
  properties: {
    path: pathSchema,
    files: arraySchema(fileSchema),
  },
});

export default schema;
