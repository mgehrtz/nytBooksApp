import {
  Controller,
  Param,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookDataAccessService } from '../data-access/book-data-access.service';
import { CategoryBookDataAccessService } from '../data-access/category-book-data-access.service';
import { BestSellersInCategory } from '../data-access/interfaces/BestSellersInCategory.interface';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookDal: BookDataAccessService,
    private readonly catBookDal: CategoryBookDataAccessService,
  ) {}

  @Get(':isbn')
  public async getBookByIsbn(@Param('isbn') isbn: string) {
    return (await this.bookDal.getBookByIsbn(isbn)) || {};
  }

  @Get('best-sellers/:categoryId')
  public async getNytBestSellersByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<any> {
    const categoryInt = Number(categoryId);
    if (isNaN(categoryInt)) {
      throw new HttpException(
        'Category ID must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.catBookDal.getBestSellersByCategory(categoryInt);
    return {
      listId: data[0].category.id,
      listName: data[0].category.title,
      books: data.map((bookDetail) => bookDetail.book),
    } as BestSellersInCategory;
  }
}
