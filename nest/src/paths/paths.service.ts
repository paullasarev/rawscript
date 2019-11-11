import { map, compose } from 'lodash/fp';
import { resolve } from 'path';
import { Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { fillDefaults } from '../utils/json-schema';
import pathSchema from '../models/path.schema';
import fotoSchema from '../models/foto.schema';
import { readDirWithTypes } from '../utils/read-dir';
import { fileInfo } from '../utils/file-info';
import { ConfigService } from '../config/config.service';

const fillEntry = fillDefaults(pathSchema);
const fillList = compose(
  map(fillEntry),
  map(({dirent, folder})=>({
    folder,
    name: dirent.name,
    isFile: dirent.isFile(),
    isDirectory: dirent.isDirectory(),
  }))
);

const fotoFillEntry = fillDefaults(fotoSchema);

@Injectable()
export class PathsService {
  constructor(config: ConfigService) {
  }

  async list(res: Response, dataRoot: string, path = '') {
    const data = [];
    const pathRoot = resolve(dataRoot, path);
    try {
      await readDirWithTypes(dataRoot, pathRoot, data);
      const result = fillList(data);
      return result;
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send(`invalid path: ${path}`);
    }
  }


  async getFile(res: Response, baseRoot: string, dataRoot: string, path: string, file: string) {
    if (!path) {
      return;
    }
    const entryRoot = resolve(dataRoot, path, file);
    const obj = await fileInfo(baseRoot, entryRoot);

    if (obj) {
      return fotoFillEntry(obj);
    }

    res.status(HttpStatus.NOT_FOUND).send(`invalid path: ${path}/${file}`);
  }

}
