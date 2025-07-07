import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BookDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBookByIsbn(isbn: string) {
    return await this.prisma.book.findFirst({
      where: {
        id: isbn,
      },
      include: {
        ratings: true,
        comments: true,
      },
    });
  }

  public async getAllIsbns(): Promise<string[]> {
    const rows = await this.prisma.book.findMany({
      select: { id: true },
    });
    return rows.map((row) => row.id);
  }

  public async createMany(books: Book[]) {
    return await this.prisma.book.createMany({
      data: books,
    });
  }

  public async updateScore(bookId: string, avgScore: number) {
    return await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data:  {
        avgRating: avgScore,
      },
    });
  }
}
