import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  public readonly rootFolder: string;
  public readonly dataFolder: string;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
    this.rootFolder = resolve(__dirname, '..', '..', '..');
    this.dataFolder = resolve(this.rootFolder, this.get('DATA_FOLDER'));
    console.log('rootFoldert', this.rootFolder)
    console.log('dataFolder', this.dataFolder)
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}