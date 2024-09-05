import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  description: string;
}
