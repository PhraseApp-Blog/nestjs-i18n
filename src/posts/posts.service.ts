import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<Post | null> {
    return await this.postRepo.findOneBy({ id });
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepo.create({
      ...createPostDto,
    });

    return this.postRepo.save(newPost);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post | null> {
    const post = await this.findOne(id);

    if (!post) {
      return null;
    }

    if (post) {
      post.title = updatePostDto.title ?? post.title;
      post.content = updatePostDto.content ?? post.content;
    }

    return await this.postRepo.save(post);
  }
}
