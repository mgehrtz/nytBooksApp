import { Injectable } from '@nestjs/common';
import { BookDataAccessService } from '../data-access/book-data-access.service';
import { Rating } from '@prisma/client';

@Injectable()
export class AverageRatingLogicService {
  constructor(private readonly bookDal: BookDataAccessService) {}

  public async recalculateAverageRating(bookId: string) {
    const book = await this.bookDal.getBookByIsbn(bookId);
    if (book == null) return;
    const score = this.calculateAverage(book.ratings);
    await this.bookDal.updateScore(book.id, score);
  }

  private calculateAverage(ratings: Rating[]): number {
    let total = 0;
    for (const rating of ratings) {
      total += rating.score;
    }
    const avg = total / ratings.length;
    return parseFloat(avg.toFixed(1));
  }
}
