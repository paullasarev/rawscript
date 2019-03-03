import { stringSchema, numberSchema } from "./common";

export const yearSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    folder: stringSchema,
    count: numberSchema,
  },
}