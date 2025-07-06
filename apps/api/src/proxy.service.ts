import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { NytOverview } from './data-access/interfaces/NytOverview.interface';
import { Book, Category, CategoryBook } from '@prisma/client';
import { CategoryDataAccessService } from './data-access/category-data-access.service';
import { BookDataAccessService } from './data-access/book-data-access.service';
import { CategoryBookDataAccessService } from './data-access/category-book-data-access.service';

@Injectable()
export class ProxyService {
  constructor(
    private readonly http: HttpService,
    private readonly categoryDal: CategoryDataAccessService,
    private readonly bookDal: BookDataAccessService,
    private readonly catBookDal: CategoryBookDataAccessService,
  ) {}

  private readonly logger = new Logger(ProxyService.name);

  public async saveNytListToDb() {
    const data = await this.getLatestNytList();
    const categories = [] as Category[];
    const categoryBookConnections = [] as CategoryBook[];
    const bookMap = new Map<string, Book>();
    for (const list of data.results.lists) {
      if (list.display_name == '') continue; // some lists don't have a name for some reason
      categories.push({
        id: list.list_id,
        title: list.display_name,
      } as Category);

      for (const nytBook of list.books) {
        if (bookMap.has(nytBook.primary_isbn13)) {
          categoryBookConnections.push({
            bookId: nytBook.primary_isbn13,
            categoryId: list.list_id,
            rank: nytBook.rank,
          } as CategoryBook);
          continue;
        }
        bookMap.set(nytBook.primary_isbn13, {
          id: nytBook.primary_isbn13,
          publisher: nytBook.publisher,
          description: nytBook.description,
          title: nytBook.title,
          author: nytBook.author,
          contributor: nytBook.contributor,
          bookImageUrl: nytBook.book_image,
          amazonProductUrl: nytBook.amazon_product_url,
          ageGroup: nytBook.age_group,
          bookReviewUrl: nytBook.book_review_link,
          avgRating: 0,
        } as Book);
        categoryBookConnections.push({
          bookId: nytBook.primary_isbn13,
          categoryId: list.list_id,
          rank: nytBook.rank,
        } as CategoryBook);
      }
    }

    await this.categoryDal.createMany(categories);
    await this.catBookDal.clearCurrentLists();
    const currentIsbns = await this.bookDal.getAllIsbns();
    const booksToCreate = Array.from(bookMap.values()).filter(
      (book) => !currentIsbns.includes(book.id),
    );
    await this.bookDal.createMany(booksToCreate);
    await this.catBookDal.createManyConnections(categoryBookConnections);
    this.logger.log('Successfully saved NYT data.');
  }

  private async getLatestNytList(): Promise<NytOverview> {
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
