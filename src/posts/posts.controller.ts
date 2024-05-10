import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  async findAll(): Promise<PostSummary[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<PostEntity> {
    const post = await this.postsService.findOne(+id);

    if (!post) {
      this.throwNotFound(id);
    }

    return post;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postsService.update(
      +id,
      updatePostDto,
    );

    if (!post) {
      this.throwNotFound(id);
    }

    return post;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const ok = await this.postsService.remove(+id);

    if (!ok) {
      this.throwNotFound(id);
    }

    return { message: 'Post deleted' };
  }

  private throwNotFound(id: string): never {
    throw new NotFoundException(
      `Post with ID ${id} not found`,
    );
  }
}
