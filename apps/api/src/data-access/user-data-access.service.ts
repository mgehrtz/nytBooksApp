import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UserDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
