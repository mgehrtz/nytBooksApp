import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryBook } from '@prisma/client';

@Injectable()
export class CategoryBookDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBestSellersByCategory(categoryId: number) {
    return await this.prisma.categoryBook.findMany({
      where: {
        categoryId: categoryId,
      },
      include: { book: true, category: true },
      orderBy: { rank: 'asc' },
    });
  }

  public async createManyConnections(connections: CategoryBook[]) {
    return await this.prisma.categoryBook.createMany({
      data: connections,
    });
  }

  public async clearCurrentLists() {
    await this.prisma.categoryBook.deleteMany();
  }
}
