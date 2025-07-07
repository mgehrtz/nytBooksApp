import { Module } from '@nestjs/common';
import { AverageRatingLogicService } from './average-rating-logic.service';

@Module({
  providers: [AverageRatingLogicService],
  exports: [AverageRatingLogicService],
})
export class LogicModule {}
