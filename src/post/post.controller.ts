import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  NotFoundException,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/CreatePost.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  getAll() {
    return this.postService.getAll();
  }

  @Post('posts')
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
}
