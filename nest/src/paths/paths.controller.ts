import {Controller, Get, Param, Res} from '@nestjs/common';
import {Response} from 'express';
import {resolve} from 'path';

import {PathsService} from './paths.service';
import {ConfigService} from '../config/config.service';
import {makePath} from '../utils/path';

@Controller('paths')
export class PathsController {
  public filesFolder: string;
  public rootFolder: string;

  constructor(
    private readonly PathsService: PathsService,
    private readonly config: ConfigService,
    ) {
      this.filesFolder = this.config.filesFolder;
      this.rootFolder = this.config.rootFolder;
    }

  @Get(':path/:file')
  async getFile(@Param() params, @Res() res: Response) {
    const path = makePath(params.path);
    const file = makePath(params.file);
    const result = await this.PathsService.getFile(res, this.rootFolder, this.filesFolder, path, file);
    res.send(result);
  }

  @Get(':path')
  async listPath(@Param() params, @Res() res: Response) {
    const path = makePath(params.path);
    const result = await this.PathsService.list(res, this.filesFolder, path);
    res.send(result);
  }

  @Get()
  async list(@Res() res: Response) {
    const result = await this.PathsService.list(res, this.filesFolder);
    res.send(result);
  }
}
