import { Controller, Get } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('api')
export class AppController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('nyt-data')
  public async getNytBestSellersList(): Promise<any> {
    return await this.proxyService.getLatestNytList();
  }
}
