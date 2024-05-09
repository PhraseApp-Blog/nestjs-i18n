import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

export type TranslatedPostSummary = {
  id: number;
  title: string;
};

export type TranslatedPost = {
  id: number;
  title: string;
  content: string;
};

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    private readonly i18n: YcI18nService,
  ) {}

  async findAll(): Promise<TranslatedPostSummary[]> {
    const lang = this.i18n.lang();

    const post = await this.postRepo.find({
      select: ['id', `title_${lang}`],
    });

    return post.map((p) => ({
      id: p.id,
      title: p[`title_${lang}`],
    }));
  }

  async findOne(id: number): Promise<TranslatedPost> {
    const lang = this.i18n.lang();
    const post = await this.postRepo.findOne({
      select: ['id', `title_${lang}`, `content_${lang}`],
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${id} not found`,
      );
    }

    return {
      id: post.id,
      title: post[`title_${lang}`],
      content: post[`content_${lang}`],
    };
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepo.save(createPostDto);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.postRepo.findOneBy({ id });

    if (post) {
      post.title_en =
        updatePostDto.title_en ?? post.title_en;
      post.title_ar =
        updatePostDto.title_ar ?? post.title_ar;
      post.content_en =
        updatePostDto.content_en ?? post.content_en;
      post.content_ar =
        updatePostDto.content_ar ?? post.content_ar;

      this.postRepo.save(post);
    }

    return post;
  }
}
