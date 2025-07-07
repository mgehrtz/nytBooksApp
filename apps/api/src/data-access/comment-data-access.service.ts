import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Comment } from '@prisma/client';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(comment: CommentDto) {
    const newComment = {} as Comment;
    Object.assign(newComment, comment);
    newComment.publishedDate = new Date();
    newComment.userId = 1; // todo: get auth user here instead

    return await this.prisma.comment.create({
      data: newComment,
    });
  }
}
