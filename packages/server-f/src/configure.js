import { parse } from 'dotenv';
import { readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

export default function configure(filePath) {
  // 👇️ "/home/john/Desktop/javascript"
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const envConfig = parse(readFileSync(filePath));
  const rootFolder = resolve(__dirname, '..', '..');
  const configDataFolder = envConfig['DATA_FOLDER'];
  const dataFolder = resolve(rootFolder, configDataFolder);
  mkdirSync(dataFolder, { recursive: true });
  const filesFolder = resolve(rootFolder, configDataFolder, 'files');
  mkdirSync(filesFolder, { recursive: true });
  const uploadFolder = os.platform() === 'darwin' ? '/tmp/uploads' :resolve(rootFolder, configDataFolder, 'uploads');
  mkdirSync(uploadFolder, { recursive: true });
  return {
    envConfig,
    rootFolder,
    dataFolder,
    uploadFolder,
    filesFolder,
    get: function(key) { return this.envConfig[key] },
  };
}
