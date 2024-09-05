import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  userId: number;
}
