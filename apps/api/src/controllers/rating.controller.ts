import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RatingDataAccessService } from '../data-access/rating-data-access.service';
import { AverageRatingLogicService } from '../logic/average-rating-logic.service';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingDal: RatingDataAccessService,
    private readonly ratingLogic: AverageRatingLogicService,
  ) {}

  @Get('/user/:userId/book/:bookId')
  public async getRatingByUserAndBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ) {
    const parsedUserId = parseInt(userId);
    return (
      (await this.ratingDal.getRatingByUserAndBook(parsedUserId, bookId)) || {}
    );
  }

  @Post('/book/:bookId')
  public async rateBook(
    @Param('bookId') bookId: string,
    @Body() body: { score: number },
  ) {
    const score = Number(body.score);
    if (isNaN(score)) {
      throw new HttpException('Invalid score.', HttpStatus.BAD_REQUEST);
    }
    await this.ratingDal.createOrUpdate(1, bookId, score); // todo grab auth user here
    await this.ratingLogic.recalculateAverageRating(bookId);
  }
}
