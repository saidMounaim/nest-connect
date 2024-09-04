import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const posts = await this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  }
}
