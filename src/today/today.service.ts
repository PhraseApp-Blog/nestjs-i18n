import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';

@Injectable()
export class TodayService {
  constructor(
    private readonly i18n: YcI18nService,
    private readonly postsService: PostsService,
  ) {}

  getToday() {
    return {
      quote: this.i18n.t('today.quote'),
      plannedRun: this.i18n.t('today.plannedRun', {
        args: {
          count: 4,
        },
      }),
      trendingPosts: this.postsService
        .findAll()
        .slice(0, 2),
    };
  }
}
