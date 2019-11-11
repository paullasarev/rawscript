import {has, get} from 'lodash';

export function makePath(path = '') {
    path = path.replace(/::+/g, ':');
    path = path.replace(/(^:+)|(:+$)/g, '');
    return path.split(':').join('/');
}

export function getFirst(obj, paths, defaultValue = undefined) {
  for (const path of paths) {
    if (has(obj, path)) {
      return get(obj, path);
    }
  }
  return defaultValue;
}

