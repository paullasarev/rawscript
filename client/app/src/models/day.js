import { stringSchema, numberSchema } from "./common";

export const daySchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    folder: stringSchema,
    count: numberSchema,
  },
}