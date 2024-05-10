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
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import {
  PostsService,
  TranslatedPost,
  TranslatedPostSummary,
} from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly i18n: YcI18nService,
  ) {}

  @Get()
  async findAll(): Promise<TranslatedPostSummary[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<TranslatedPost> {
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
    const updatedPost = await this.postsService.update(
      +id,
      updatePostDto,
    );

    if (!updatedPost) {
      this.throwNotFound(id);
    }

    return updatedPost;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const ok = await this.postsService.remove(+id);

    if (!ok) {
      this.throwNotFound(id);
    }

    return {
      message: this.i18n.t('posts.deleteSuccess', {
        args: { id },
      }) as string,
    };
  }

  private throwNotFound(id: string): never {
    throw new NotFoundException(
      this.i18n.t('posts.notFound', { args: { id } }),
    );
  }
}
