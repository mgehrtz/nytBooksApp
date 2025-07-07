import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class RatingDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getRatingByUserAndBook(userId: number, bookId: string) {
    return await this.prisma.rating.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });
  }

  public async createOrUpdate(userId: number, bookId: string, score: number) {
    return await this.prisma.rating.upsert({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
      create: {
        score: score,
        publishedDate: new Date(),
        userId: 1, //todo get auth user
        bookId: bookId,
      },
      update: {
        score: score,
        updatedDate: new Date(),
      },
    });
  }
}
