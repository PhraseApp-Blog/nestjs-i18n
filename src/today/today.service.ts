import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class TodayService {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  getToday() {
    return {
      quote:
        'The only way to do great work is to love what you do.',
      trendingPosts: this.postsService
        .findAll()
        .slice(0, 2),
    };
  }
}
