// src/posts/posts.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

export interface PostSummary {
  id: number;
  title: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'Content of the first post',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'Content of the second post',
    },
  ];

  findAll(): PostSummary[] {
    return this.posts.map(({ id, title }) => ({
      id,
      title,
    }));
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${id} not found`,
      );
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.posts.length + 1,
      title: createPostDto.title,
      content: createPostDto.content,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);

    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;

    return post;
  }
}
