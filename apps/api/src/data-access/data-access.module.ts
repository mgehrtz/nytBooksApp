import { Module } from '@nestjs/common';
import { UserDataAccessService } from './user-data-access.service';
import { PrismaService } from './prisma/prisma.service';
import { BookDataAccessService } from './book-data-access.service';
import { CategoryDataAccessService } from './category-data-access.service';

@Module({
  providers: [
    UserDataAccessService,
    PrismaService,
    BookDataAccessService,
    CategoryDataAccessService,
  ],
  exports: [
    UserDataAccessService,
    BookDataAccessService,
    CategoryDataAccessService,
  ],
})
export class DataAccessModule {}
