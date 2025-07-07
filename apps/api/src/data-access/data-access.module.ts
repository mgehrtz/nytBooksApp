import { Module } from '@nestjs/common';
import { UserDataAccessService } from './user-data-access.service';
import { PrismaService } from './prisma/prisma.service';
import { BookDataAccessService } from './book-data-access.service';
import { CategoryDataAccessService } from './category-data-access.service';
import { CategoryBookDataAccessService } from './category-book-data-access.service';
import { CommentDataAccessService } from './comment-data-access.service';
import { RatingDataAccessService } from './rating-data-access.service';

@Module({
  providers: [
    UserDataAccessService,
    PrismaService,
    BookDataAccessService,
    CategoryDataAccessService,
    CategoryBookDataAccessService,
    CommentDataAccessService,
    RatingDataAccessService,
  ],
  exports: [
    UserDataAccessService,
    BookDataAccessService,
    CategoryDataAccessService,
    CategoryBookDataAccessService,
    CommentDataAccessService,
  ],
})
export class DataAccessModule {}
