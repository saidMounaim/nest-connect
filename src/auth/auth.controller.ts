import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  register(
    @Body() userInfo: RegisterUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.authService.register(userInfo, image);
  }
}
