import { Module } from '@nestjs/common';
import { AverageRatingLogicService } from './average-rating-logic.service';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  providers: [AverageRatingLogicService, DataAccessModule],
  exports: [AverageRatingLogicService],
})
export class LogicModule {}
