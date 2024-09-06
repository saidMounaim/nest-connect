import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('/post/:postId/like')
  @UseGuards(JwtAuthGuard)
  likePost(@Param('postId', ParseIntPipe) postId: number, @Req() req: any) {
    const userId = req.user.id;
    return this.likeService.likePost(userId, postId);
  }
}
