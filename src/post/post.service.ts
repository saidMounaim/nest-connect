import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    const posts = await this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  }

  async addPost(data: CreatePostDto, image: Express.Multer.File) {
    let uploadedImageUrl: string;
    if (image) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(image);
        uploadedImageUrl = uploadResult.url;
      } catch (error) {
        throw new HttpException(error, 401);
      }
    }

    const newPost = {
      ...data,
      image: uploadedImageUrl,
    };

    return await this.prisma.post.create({ data: newPost });
  }
}
