import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password && !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(userInfo: RegisterUserDto, image: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (user) {
      throw new HttpException('User already exist', 401);
    }

    const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

    let uploadedImageUrl: string;
    try {
      const uploadResult = await this.cloudinaryService.uploadImage(image);
      uploadedImageUrl = uploadResult.url;
    } catch (error) {
      throw new HttpException(error, 401);
    }

    const newUser = this.prisma.user.create({
      data: {
        ...userInfo,
        password: hashedPassword,
        image: uploadedImageUrl,
      },
    });

    return newUser;
  }
}
