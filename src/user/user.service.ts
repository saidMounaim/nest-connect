import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const allPosts = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        name: true,
        image: true,
        posts: true,
      },
    });
    return allPosts;
  }
}
