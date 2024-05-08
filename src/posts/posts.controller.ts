import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostSummary, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Get()
  findAll(): PostSummary[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PostEntity {
    return this.postsService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createPostDto: CreatePostDto): PostEntity {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostEntity {
    return this.postsService.update(+id, updatePostDto);
  }
}
