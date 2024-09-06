import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const likeExist = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (likeExist) {
      throw new HttpException('User has already liked this post', 401);
    }

    return this.prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });
  }

  async unlikePost(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const likeExist = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });

    if (!likeExist) {
      throw new HttpException('Like not found', 404);
    }

    return this.prisma.like.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    });
  }

  async getAllLikesByPost(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const likes = await this.prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return likes;
  }
}
