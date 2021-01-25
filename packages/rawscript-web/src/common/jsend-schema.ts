import {
  arraySchema,
  arrayToByIdSchema,
  JsonSchema,
  numberSchema,
  stringSchema,
} from './json-schema';

export interface JSendApiResponse<T> {
  Data: T;
  Message?: string;
  Status: string;
}

export interface JSendApiResponseList<T> {
  Data: T[];
  Message?: string;
  Status: string;
}
export interface JSendApiResponseListById<T> {
  Data: {
    [k: string]: T;
  };
  Message?: string;
  Status: string;
}

export interface JSendApiResponseObjectListsById<T> {
  Data: {
    [k: string]: T[];
  };
  Message?: string;
  Status: string;
}

export interface PagedItems<T> {
  PageSize: number;
  PageNumber: number;
  ItemsCount: number;
  PageCount: number;
  Items: T[];
}

export interface JSendPagedResponse<T> {
  Data: {
    PageSize: number;
    PageNumber: number;
    ItemsCount: number;
    PageCount: number;
    Items: T[];
  };
  Message?: string;
  Status: string;
}

export function jSendSchema(schema: JsonSchema): JsonSchema {
  return {
    type: 'object',
    properties: {
      Data: schema,
      Message: stringSchema,
      Status: stringSchema,
    },
    required: ['Data', 'Message', 'Status'],
  };
}

export function jSendArraySchema(schema: JsonSchema): JsonSchema {
  return {
    type: 'object',
    properties: {
      Data: arraySchema(schema),
      Message: stringSchema,
      Status: stringSchema,
    },
    required: ['Data', 'Message', 'Status'],
  };
}

export function jSendArrayToByIdSchema(schema: JsonSchema): JsonSchema {
  return {
    type: 'object',
    properties: {
      Data: arrayToByIdSchema(schema),
      Message: stringSchema,
      Status: stringSchema,
    },
    required: ['Data', 'Message', 'Status'],
  };
}

export function pagedSchema(schema: JsonSchema, defaultValue = {}): JsonSchema {
  return {
    type: 'object',
    default: defaultValue,
    properties: {
      Items: arraySchema(schema),
      PageSize: numberSchema,
      PageNumber: numberSchema,
      ItemsCount: numberSchema,
      PageCount: numberSchema,
    },
    required: ['Items', 'PageSize', 'PageNumber', 'ItemsCount', 'PageCount'],
  };
}

export function jSendPagedSchema(schema: JsonSchema): JsonSchema {
  return {
    type: 'object',
    properties: {
      Data: pagedSchema(schema),
      Message: stringSchema,
      Status: stringSchema,
    },
    required: ['Data', 'Message', 'Status'],
  };
}
