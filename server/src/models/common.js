export const schemaDefault = (schema, defaultValue) => ({ ...schema, default: defaultValue });

export const stringSchema = { type: 'string' };
export const numberSchema = { type: 'number' };

export const booleanSchema = { type: 'boolean' };
export const trueSchema = schemaDefault(booleanSchema, true);
export const falseSchema = schemaDefault(booleanSchema, true);
