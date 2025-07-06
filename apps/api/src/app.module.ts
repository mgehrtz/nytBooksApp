import { Module, OnModuleInit } from '@nestjs/common';
import { DataAccessModule } from './data-access/data-access.module';
import { ProxyService } from './proxy.service';
import { HttpModule } from '@nestjs/axios';
import { BookController } from './controllers/book.controller';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [DataAccessModule, HttpModule],
  controllers: [BookController, CategoryController],
  providers: [ProxyService, DataAccessModule],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly proxyService: ProxyService) {}

  async onModuleInit() {
    await this.proxyService.saveNytListToDb();
  }
}
