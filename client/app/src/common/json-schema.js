// @flow
import { forOwn, curryN } from 'lodash/fp';

const forOwnC = forOwn.convert({ cap: false });

function processNode(schemaNode, dataNode) {
  switch (schemaNode.type) {
    case 'object':
      return processObject(schemaNode, dataNode); // eslint-disable-line no-use-before-define

    case 'array':
      return processArray(schemaNode, dataNode); // eslint-disable-line no-use-before-define

    default:
      if (dataNode !== undefined) return dataNode;
      if (schemaNode.default !== undefined) return schemaNode.default;
      return undefined;
  }
}

function processObject(schemaNode, dataNode) {
  const result = {};

  forOwnC((propertySchema, propertyName) => {
    if (
      propertySchema.required
      || (dataNode !== undefined && dataNode[propertyName] !== undefined)) {
      const nodeValue = dataNode !== undefined ? dataNode[propertyName] : undefined;
      result[propertyName] = processNode(propertySchema, nodeValue);
    }
  })(schemaNode.properties);

  if (dataNode) {
    forOwnC((propertyValue, propertyName) => {
      if (result[propertyName] === undefined && propertyValue !== undefined) {
        result[propertyName] = propertyValue;
      }
    })(dataNode);
  }
  return result;
}

function processArray(schemaNode, dataNode) {
  if (dataNode === undefined) {
    if (schemaNode.default) {
      return schemaNode.default;
    }

    return undefined;
  }

  const result = [];

  for (let i = 0; i < dataNode.length; ++i) {
    result.push(processNode(schemaNode.items, dataNode[i]));
  }
  return result;
}

export const fillDefaults = curryN(2, processNode);
