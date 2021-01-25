export interface Path {
  name: string;
  folder: string;
  isDirectory: boolean;
  isFile: boolean;
}

export type PathArray = Path[];
