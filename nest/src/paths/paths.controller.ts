import { Controller, Get, Param, Res } from '@nestjs/common';
import { PathsService } from './paths.service';
import { ConfigService } from '../config/config.service';
import { Response, response } from 'express';

function makePath(path = '') {
  path = path.replace(/::+/g, ':');
  path = path.replace(/(^:+)|(:+$)/g, '');
  return path.split(':').join('/');
}

@Controller('paths')
export class PathsController {
  public dataFolder: string;
  public rootFolder: string;

  constructor(
    private readonly PathsService: PathsService,
    private readonly config: ConfigService,
    ) {
      this.dataFolder = this.config.dataFolder;
      this.rootFolder = this.config.rootFolder;
    }

  @Get(':path/:file')
  async getFile(@Param() params, @Res() res: Response) {
    const path = makePath(params.path);
    const file = makePath(params.file);
    const result = await this.PathsService.getFile(res, this.rootFolder, this.dataFolder, path, file);
    res.send(result);
  }

  @Get(':path')
  async listPath(@Param() params, @Res() res: Response) {
    const path = makePath(params.path);
    const result = await this.PathsService.list(res, this.dataFolder, path);
    res.send(result);
  }

  @Get()
  async list(@Res() res: Response) {
    const result = await this.PathsService.list(res, this.dataFolder);
    res.send(result);
  }
}
