import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  authorId: number;

  postId: number;
}
