/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber()
  responseToId?: number;

  @IsString()
  bookId: string;
}
