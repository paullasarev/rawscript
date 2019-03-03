import { stringSchema, numberSchema } from "./common";

export const fotoSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    ext: stringSchema,
    folder: stringSchema,
    ctime: stringSchema,
    mtime: stringSchema,
    size: numberSchema,
  },
}