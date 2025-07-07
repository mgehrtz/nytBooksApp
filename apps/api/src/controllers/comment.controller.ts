import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentDataAccessService } from '../data-access/comment-data-access.service';
import { CommentDto } from '../data-access/dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentDal: CommentDataAccessService) {}

  @Post()
  public async postComment(@Body() comment: CommentDto) {
    return await this.commentDal.create(comment);
  }

  @Delete(':commentId')
  public async deleteComment(@Param('commentId') commentIdString: string) {
    const commentId = Number(commentIdString);
    if (isNaN(commentId)) {
      throw new HttpException('Invalid comment ID.', HttpStatus.BAD_REQUEST);
    }
    return await this.commentDal.remove(commentId);
  }
}
