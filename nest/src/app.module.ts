import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PathsController } from './paths/paths.controller';
import { PathsService } from './paths/paths.service';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';

const multerModule = MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    dest: configService.uploadFolder,
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    multerModule,
  ],
  controllers: [
    AppController,
    PathsController,
    UploadController,
  ],
  providers: [
    AppService,
    PathsService,
    UploadService,
  ],
})
export class AppModule {
  constructor(public config: ConfigService) {
    this.config = config;
  }
}
