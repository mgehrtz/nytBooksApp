import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataAccessModule } from './data-access/data-access.module';
import { ProxyService } from './proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DataAccessModule, HttpModule],
  controllers: [AppController],
  providers: [ProxyService],
})
export class AppModule {}
