import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { NytOverview } from './interfaces/NytOverview.interface';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(private readonly http: HttpService) {}

  public async getLatestNytList(): Promise<NytOverview> {
    const { data } = await firstValueFrom(
      this.http
        .get<NytOverview>(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NYT_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new HttpException(
              'Could not fetch current NYT Best Sellers list.',
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          }),
        ),
    );
    return data;
  }
}
