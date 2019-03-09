// @flow
import { stringSchema, numberSchema } from './common';

export const catalogSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    folder: stringSchema,
  },
};

export type Catalog = {
  name: string,
  folder: string,
};

export type Catalogs = Array<Catalog>;
