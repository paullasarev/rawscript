import { Injectable } from '@nestjs/common';
import { map } from 'lodash';

import { exec } from 'child_process';
import { promisify } from 'util';
import moveFile from 'move-file';
import { getFirst } from '../utils/path';

import { parse } from 'date-fns';

const asyncExec = promisify(exec);

interface IUploadFile {
  // originalname: '4eaeae34-16cd-451d-9d1e-e7588455c766.jpg',
  // encoding: '7bit',
  // mimetype: 'image/jpeg',
  // destination: 'c:\\projects\\rawscript\\data\\uploads',
  // filename: 'c7287c151bd78d1fda5364698305d6ef',
  // path: 'c:\\projects\\rawscript\\data\\uploads\\c7287c151bd78d1fda5364698305d6ef',
  // size: 146899
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
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
    // console.log('exifs', exifs)

    const results = [];
    for (let ind = 0; ind < files.length; ++ind) {
      const file = files[ind];
      const exif = exifs[ind];
      const { filename, originalname, size, mimetype } = file;
      results.push({
        ...exif,
        filename,
        originalname,
        size,
        mimetype,
      });
    }
    // console.log('uploaded1', results);

    for (let result of results) {
      const { originalname, size, mimetype, filename } = result;
      console.log(originalname, filename)
      const strDate = getFirst(result,
        ['DateTimeOriginal', 'CreateDate', 'FileModifyDate', 'FileAccessDate'],
      );
      console.log({strDate})
      const date = parse(strDate, 'yyyy.MM.dd hh:mm:ss', new Date());
      console.log({date})
      console.log(originalname, date.getFullYear(), date.getMonth(), date.getDay())
    }

    console.log('uploaded', results);
    return results;
  }
}
