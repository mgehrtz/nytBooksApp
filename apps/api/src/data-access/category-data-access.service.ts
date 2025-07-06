import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async createMany(categories: Category[]) {
    await this.prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
  }
}
