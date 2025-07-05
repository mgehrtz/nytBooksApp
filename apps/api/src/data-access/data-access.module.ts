import { Module } from '@nestjs/common';
import { UserDataAccessService } from './user-data-access.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [UserDataAccessService, PrismaService],
  exports: [UserDataAccessService],
})
export class DataAccessModule {}
