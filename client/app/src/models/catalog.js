import { stringSchema, numberSchema } from "./common";

export const catalogSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    folder: stringSchema,
  },
};
