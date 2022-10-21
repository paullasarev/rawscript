import keys from 'lodash/keys.js';

export const schemaDefault = (schema, defaultValue) => ({ ...schema, default: defaultValue });

export const stringSchema = { type: 'string' };
export const numberSchema = { type: 'number' };

export const booleanSchema = { type: 'boolean' };
export const trueSchema = schemaDefault(booleanSchema, true);
export const falseSchema = schemaDefault(booleanSchema, true);

export function arraySchema(schema, defaultValue = []) {
  return {
    type: 'array',
    default: defaultValue,
    items: schema,
  };
}

export function requiredSchema(schema) {
  return {
    ...schema,
    required: keys(schema.properties),
  };
}
