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
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  public async update(commentId: number, newContent: string) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: newContent,
        updatedDate: new Date(),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  public async remove(commentId: number) {
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
