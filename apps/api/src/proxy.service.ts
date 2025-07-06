import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { NytOverview } from '@interfaces/NytOverview.interface';
import { Book, Category } from '@prisma/client';
import { CategoryDataAccessService } from './data-access/category-data-access.service';

@Injectable()
export class ProxyService {
  constructor(
    private readonly http: HttpService,
    private readonly categoryDal: CategoryDataAccessService,
  ) {}

  private readonly logger = new Logger(ProxyService.name);

  public async saveNytListToDb() {
    const data = await this.getLatestNytList();
    const categories = [] as Category[];
    const books = [] as Book[];
    for (const list of data.results.lists) {
      if (list.display_name == '') continue;
      categories.push({
        id: list.list_id,
        title: list.display_name,
      } as Category);

      for (const book of list.books) {
        books.push({
          id: book.primary_isbn13,
          publisher: book.publisher,
          description: book.description,
          title: book.title,
          author: book.author,
          contributor: book.contributor,
          bookImageUrl: book.book_image,
          amazonProductUrl: book.amazon_product_url,
          ageGroup: book.age_group,
          bookReviewUrl: book.book_review_link,
          sundayReviewUrl: book.sunday_review_link,
          onCurrentList: true,
          categoryId: list.list_id,
        } as Book);
      }
    }

    this.logger.log('Saving categories to database.');
    await this.categoryDal.createMany(categories);
  }

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
