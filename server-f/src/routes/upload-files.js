import { map, filter, padCharsStart, compose } from 'lodash/fp';
import { resolve } from 'path';
import { isValid, parse } from 'date-fns';
import { mkdir, writeFile } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import moveFile from 'move-file';
import sanitize from 'sanitize-filename';

import { getFirst } from '../utils/path';

const asyncExec = promisify(exec);
const asyncMkdir = promisify(mkdir);
const asyncWriteFile = promisify(writeFile);

// interface IUploadFile {
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: number;
// }

const pad4 = compose(padCharsStart('0')(4), String);
const pad2 = compose(padCharsStart('0')(2), String);

function getFolderName(year, month, day) {
  return `${pad4(year)}-${pad2(month)}-${pad2(day)}`;
}

function getSubfolderName(hour, minute, originalname) {
  return `${pad2(hour)}-${pad2(minute)}--${originalname}`;
}

const parseDate = (formats) => (value, defaultValue) => {
  for (let format of formats) {
    const date = parse(value, format, defaultValue);
    if (isValid(date)) {
      return date;
    }
  }
  return defaultValue;
};

const parseDateExif = parseDate(['yyyy:MM:dd HH:mm:ss', 'yyyy:MM:dd HH:mm:ssxxx', 'yyyy:MM:dd HH:mm:ssXXX']);

const filterImages = filter(({mimetype}) => mimetype.substr(0, 6) === 'image/');
const mapFilename = map(({filename})=>filename);

function buildMetadata(files, exifs) {
  const results = [];
  for (let ind = 0; ind < files.length; ++ind) {
    const file = files[ind];
    const exif = exifs[ind];
    const { filename, originalname, size, mimetype } = file;
    const strDate = getFirst(exif,
      ['DateTimeOriginal', 'CreateDate', 'FileModifyDate', 'FileAccessDate'],
    );
    const date = parseDateExif(strDate, new Date());
    const sanitizedFilename = sanitize(originalname);
    results.push({
      exif,
      input: {
        filename,
        originalname: sanitizedFilename,
        inputname: `original.${sanitizedFilename}`,
        size,
        mimetype,
        date,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    });
  }
  return results;
}

export async function uploadFiles(uploadFolder, dataFolder, pFiles) {
  const files = filterImages(pFiles);
  const filenames = mapFilename(files);
  const cmd = `docker run -v ${uploadFolder}:/tmp exiftool -json ${filenames.join(' ')}`;
  const { stdout, stderr } = await asyncExec(cmd);
  const exifs = JSON.parse(stdout);

  const results = buildMetadata(files, exifs);

  for (let result of results) {
    const { inputname, originalname, year, day, month, filename, hour, minute, size } = result.input;
    const folder = resolve(dataFolder, getFolderName(year, month, day), getSubfolderName(hour, minute, originalname));
    await asyncMkdir(folder, { recursive: true });
    const oldFilename = resolve(uploadFolder, filename);
    const newFilename = resolve(folder, inputname);
    const infoFilename = resolve(folder, 'info.json');
    console.log({ folder, inputname, size })
    await moveFile(oldFilename, newFilename);
    await asyncWriteFile(infoFilename, JSON.stringify(result, null, '  '));
  }
}
