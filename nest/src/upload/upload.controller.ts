import { Controller, Param, Post, Body, Res, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import {Response} from 'express';

import {makePath} from "../utils/path";
import {ConfigService} from "../config/config.service";
import {UploadService} from "./upload.service";
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  public filesFolder: string;
  public uploadFolder: string;

  constructor(
    private readonly UploadService: UploadService,
    private readonly config: ConfigService,
  ) {
    this.filesFolder = this.config.filesFolder;
    this.uploadFolder = this.config.uploadFolder;
  }

  @Post(':path')
  @UseInterceptors(FilesInterceptor('file'))
  async upload(@Param() params, @Res() res: Response, @UploadedFiles() files) {
    const path = makePath(params.path);
    try {
      const results = await this.UploadService.uploadFiles(this.uploadFolder, this.filesFolder, path, files);
      res.status(HttpStatus.OK).send(results);
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send(`invalid path: ${path}`);
    }
  }
}

