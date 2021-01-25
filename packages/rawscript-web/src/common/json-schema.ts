export interface JsonSchema {
  type: string;
  id?: string;
  properties?: { [k: string]: JsonSchema };
  items?: JsonSchema;
  default?: string[] | {};
  required?: string[];
}

export function arraySchema(schema: JsonSchema, defaultValue = []): JsonSchema {
  return {
    type: 'array',
    default: defaultValue,
    items: schema,
  };
}

export function arrayToByIdSchema(schema: JsonSchema, defaultValue = {}): JsonSchema {
  return {
    type: 'arrayToById',
    default: defaultValue,
    items: schema,
  };
}

export const stringSchema = { type: 'string' };
export const numberSchema = { type: 'number' };
export const dateSchema = { type: 'date' };
