import { Injectable } from '@nestjs/common';
import { map, padStart } from 'lodash';
import { resolve } from 'path';
import { parse } from 'date-fns';
import { mkdir, writeFile } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import moveFile from 'move-file';

import { getFirst } from '../utils/path';

const asyncExec = promisify(exec);
const asyncMkdir = promisify(mkdir);
const asyncWriteFile = promisify(writeFile);

interface IUploadFile {
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

function getFolderName(year, month, day) {
  return `${padStart(String(year), 4, '0')}-${padStart(String(month), 2, '0')}-${padStart(String(day), 2, '0')}`;
}

@Injectable()
export class UploadService {
  constructor() {
  }

  async uploadFiles(uploadFolder: string, dataFolder: string, path: string, files: IUploadFile[]) {
    const filenames = map(files, ({filename})=>filename);
    const cmd = `docker run -v ${uploadFolder}:/tmp exiftool -json ${filenames.join(' ')}`;
    const { stdout, stderr } = await asyncExec(cmd);
    const exifs = JSON.parse(stdout);

    const results = [];
    for (let ind = 0; ind < files.length; ++ind) {
      const file = files[ind];
      const exif = exifs[ind];
      const { filename, originalname, size, mimetype } = file;
      const strDate = getFirst(exif,
        ['DateTimeOriginal', 'CreateDate', 'FileModifyDate', 'FileAccessDate'],
      );
      const date = parse(strDate, 'yyyy:MM:dd HH:mm:ss', new Date());
      results.push({
        exif,
        input: {
          filename,
          originalname,
          size,
          mimetype,
          date,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }
      });
    }

    for (let result of results) {
      const { originalname, size, year, day, month, mimetype, filename } = result.input;
      const folder = resolve(dataFolder, getFolderName(year, month, day), originalname);
      await asyncMkdir(folder, { recursive: true });
      const oldFilename = resolve(uploadFolder, filename);
      const newFilename = resolve(folder, originalname);
      const infoFilename = resolve(folder, 'info.json');
      console.log({oldFilename, folder, newFilename, infoFilename})
      await moveFile(oldFilename, newFilename);
      await asyncWriteFile(infoFilename, JSON.stringify(result, null, '  '));
    }

    return results;
  }
}
