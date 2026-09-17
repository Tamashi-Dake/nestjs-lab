import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DesignController } from './design/design.controller.js';
import { DesignService } from './design/design.service.js';
import { DesignModule } from './design/design.module.js';

@Module({
  imports: [DesignModule],
  controllers: [AppController, DesignController],
  providers: [AppService, DesignService],
})
export class AppModule {}
