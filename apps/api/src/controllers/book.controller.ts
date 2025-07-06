import { Controller, Param, Get } from '@nestjs/common';
import { BookDataAccessService } from '../data-access/book-data-access.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookDal: BookDataAccessService) {}

  @Get(':isbn')
  public async getBookByIsbn(@Param('isbn') isbn: string) {
    await this.bookDal.getBookByIsbn(isbn);
  }
}
