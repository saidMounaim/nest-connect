import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/AddComment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCommentDto } from './dto/UpdateComment.dto';

@Controller('')
export class CommentController {
  constructor(private commentSerivce: CommentService) {}

  @Get('/comments')
  getAll() {
    return this.commentSerivce.getAll();
  }

  @Post('/post/:postId/comments')
  @UseGuards(JwtAuthGuard)
  addCommment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() addCommentDto: AddCommentDto,
    @Req() req: any,
  ) {
    const authorId = req.user.id;
    const data: AddCommentDto = { ...addCommentDto, authorId, postId };
    return this.commentSerivce.addComment(data);
  }

  @Put('/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body()
    updateCommentDto: UpdateCommentDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const data: UpdateCommentDto = { ...updateCommentDto, id: commentId };
    return this.commentSerivce.updateComment(data, userId);
  }

  @Delete('/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.commentSerivce.deleteComment(commentId, userId);
  }
}
