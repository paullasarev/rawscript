import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PathsController } from './paths/paths.controller';
import { PathsService } from './paths/paths.service';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
  ],
  controllers: [
    AppController,
    PathsController,
  ],
  providers: [
    AppService,
    PathsService,
  ],
})
export class AppModule {
  constructor(public config: ConfigService) {
    this.config = config;
  }
}
