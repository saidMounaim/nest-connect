import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdatePostDto } from './dto/UpdatePost.dto';

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

  async getSingle(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
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

  async updatePost(
    data: UpdatePostDto,
    image: Express.Multer.File,
    postId: number,
    userId: number,
  ) {
    let post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post && post.authorId !== userId) {
      throw new HttpException(
        'You do not have permission to update this post',
        401,
      );
    }

    let uploadedImageUrl: string;
    if (image) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(image);
        uploadedImageUrl = uploadResult.url;
      } catch (error) {
        throw new HttpException(error, 401);
      }
    } else {
      uploadedImageUrl = post.image;
    }

    const updatedData = { ...data, image: uploadedImageUrl };

    post = await this.prisma.post.update({
      where: { id: postId },
      data: updatedData,
    });

    return post;
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    if (post && post.authorId !== userId) {
      throw new HttpException(
        'You do not have permission to delete this post',
        401,
      );
    }
    return await this.prisma.post.delete({ where: { id: postId } });
  }
}
