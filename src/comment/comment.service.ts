import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCommentDto } from './dto/AddComment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const comments = await this.prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return comments;
  }

  async addComment(addCommentDto: AddCommentDto) {
    const { description, authorId, postId } = addCommentDto;

    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prisma.comment.create({
      data: { description, authorId, postId },
    });

    return comment;
  }
}
