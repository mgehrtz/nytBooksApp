import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataAccessModule } from './data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
