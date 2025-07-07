import { Body, Controller, Post } from '@nestjs/common';
import { CommentDataAccessService } from '../data-access/comment-data-access.service';
import { CommentDto } from '../data-access/dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentDal: CommentDataAccessService) {}

  @Post()
  public async postComment(@Body() comment: CommentDto) {
    return await this.commentDal.create(comment);
  }
}
