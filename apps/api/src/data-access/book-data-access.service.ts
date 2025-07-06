import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BookDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBookByIsbn(isbn: string): Promise<Book> {
    return await this.prisma.book.findUniqueOrThrow({
      where: {
        id: isbn,
      },
    });
  }
}
