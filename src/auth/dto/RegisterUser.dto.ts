import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  password: string;
}
