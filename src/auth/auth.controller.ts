import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Put('updatePassword')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Body() updatedPasswordDto: UpdatePasswordDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const data: UpdatePasswordDto = { ...updatedPasswordDto, userId };
    return this.authService.updatePassword(data);
  }
}
