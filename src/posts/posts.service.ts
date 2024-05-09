import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

export interface PostSummary {
  id: number;
  title: string;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async findAll(): Promise<PostSummary[]> {
    return await this.postRepo.find({
      select: ['id', 'title'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${id} not found`,
      );
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.title = createPostDto.title;
    newPost.content = createPostDto.content;

    return this.postRepo.save(newPost);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.findOne(id);

    if (post) {
      post.title = updatePostDto.title ?? post.title;
      post.content = updatePostDto.content ?? post.content;
    }

    return post;
  }
}
