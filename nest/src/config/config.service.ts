import { parse } from 'dotenv';
import { readFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  public readonly rootFolder: string;
  public readonly dataFolder: string;
  public readonly filesFolder: string;
  public readonly uploadFolder: string;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
    this.rootFolder = resolve(__dirname, '..', '..', '..');
    const dataFolder = this.get('DATA_FOLDER');
    this.dataFolder = resolve(this.rootFolder, dataFolder);
    mkdirSync(this.dataFolder, {recursive: true});
    this.filesFolder = resolve(this.rootFolder, dataFolder, 'files');
    mkdirSync(this.filesFolder, {recursive: true});
    this.uploadFolder = resolve(this.rootFolder, dataFolder, 'uploads');
    mkdirSync(this.uploadFolder, {recursive: true});
    console.log('rootFolder', this.rootFolder);
    console.log('dataFolder', this.dataFolder);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
