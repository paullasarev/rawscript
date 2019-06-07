import { requiredSchema, omitId } from './common';
import pathSchema from './path.schema';
import fileSchema from './file.schema';

const schema = requiredSchema({
  type: 'object',
  id: 'Import',
  properties: {
    path: omitId(pathSchema),
    file: omitId(fileSchema),
  },
});

export default schema;
