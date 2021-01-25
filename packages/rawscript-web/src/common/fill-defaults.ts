import { forOwn, isArray } from 'lodash';
import { JsonSchema } from './json-schema';

function isDefined(obj: any) {
  return obj !== undefined && obj !== null;
}

function isType(schemaNode: any, dataNode: any, schemaType: string, nodeType: string) {
  return schemaNode.type === schemaType && typeof dataNode !== nodeType;
}

function processNode(schemaNode: any, dataNode: any): any {
  switch (schemaNode.type) {
    case 'object':
      return processObject(schemaNode, dataNode); //// eslint-disable-line no-use-before-define

    case 'array':
      return processArray(schemaNode, dataNode); //// eslint-disable-line no-use-before-define

    case 'arrayToById':
      return processArrayToById(schemaNode, dataNode);

    default:
      if (isDefined(dataNode)) {
        if (isType(schemaNode, dataNode, 'string', 'string')) {
          return String(dataNode);
        }
        if (isType(schemaNode, dataNode, 'number', 'number')) {
          return Number(dataNode);
        }
        if (isType(schemaNode, dataNode, 'integer', 'number')) {
          return Number(dataNode);
        }
        return dataNode;
      }
      if (isDefined(schemaNode.default)) {
        return schemaNode.default;
      }
      if (schemaNode.type === 'integer') {
        return 0;
      }
      return undefined;
  }
}

function processObject(schemaNode: any, dataNode: any): any {
  const result: any = {};

  forOwn(schemaNode.properties, (propertySchema, propertyName) => {
    const isRequired =
      isArray(schemaNode.required) && schemaNode.required.indexOf(propertyName) >= 0;
    if (isRequired || (isDefined(dataNode) && isDefined(dataNode[propertyName]))) {
      const nodeValue = isDefined(dataNode) ? dataNode[propertyName] : undefined;
      result[propertyName] = processNode(propertySchema, nodeValue);
    }
  });

  if (dataNode) {
    forOwn(dataNode, (propertyValue, propertyName) => {
      if (!isDefined(result[propertyName]) && isDefined(propertyValue)) {
        result[propertyName] = propertyValue;
      }
    });
  }
  return result;
}

function processArray(schemaNode: any, dataNode: any) {
  if (dataNode === undefined || dataNode === null) {
    if (schemaNode.default) {
      return schemaNode.default;
    }
    return [];
  }

  const result = [];

  for (let i = 0; i < dataNode.length; i++) {
    result.push(processNode(schemaNode.items, dataNode[i]));
  }
  return result;
}

function processArrayToById(schemaNode: any, dataNode: any): any {
  if (dataNode === undefined || dataNode === null) {
    if (schemaNode.default) {
      return schemaNode.default;
    }
    return {};
  }

  const result: any = {};

  for (let i = 0; i < dataNode.length; i++) {
    result[dataNode[i].Id] = processNode(schemaNode.items, dataNode[i]);
  }
  return result;
}

export const fillDefaults = (schema: JsonSchema) => (data: any) => {
  return processNode(schema, data);
};

export function getDefaultsBySchema<T = any>(schema: JsonSchema): () => T {
  return () => fillDefaults(schema)({});
}

export function getDataBySchema(schema: JsonSchema) {
  return (state: any, action: any) => fillDefaults(schema)(action.data);
}
