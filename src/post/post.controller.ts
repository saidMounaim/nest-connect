import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/CreatePost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  getAll() {
    return this.postService.getAll();
  }

  @Get('/post/:postId')
  getSingle(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getSingle(postId);
  }

  @Post('/posts')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  addPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ) {
    const userId: number = req.user.id;
    const data: CreatePostDto = { ...createPostDto, authorId: userId };
    return this.postService.addPost(data, image);
  }

  @Put('/post/:postId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updatePost(
    @Body() updatedPostDto: UpdatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: any,
  ) {
    const userId: number = req.user.id;
    return this.postService.updatePost(updatedPostDto, image, postId, userId);
  }

  @Delete('/post/:postId')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('postId', ParseIntPipe) postId: number, @Req() req: any) {
    const userId: number = req.user.id;
    return this.postService.deletePost(postId, userId);
  }
}
