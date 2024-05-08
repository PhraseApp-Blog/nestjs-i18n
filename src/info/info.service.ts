import { Injectable } from '@nestjs/common';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';

@Injectable()
export class InfoService {
  constructor(private readonly i18n: YcI18nService) {}

  getInfo() {
    return {
      about: this.i18n.t('common.about'),
      lastUpdated: new Date().toISOString(),
      routes: [
        {
          verb: 'GET',
          path: '/',
          description: 'Redirects to /info',
        },
        {
          verb: 'GET',
          path: '/info',
          description: 'You are here',
        },
        {
          verb: 'GET',
          path: '/today',
          description: 'Daily quote and trending posts',
        },
        {
          posts: [
            {
              verb: 'GET',
              path: '/posts',
              description: 'Index of all posts',
            },
            {
              verb: 'GET',
              path: '/posts/1',
              description: 'Post with ID 1',
            },
            {
              verb: 'POST',
              path: '/posts',
              description: 'Create a new post',
            },
            {
              verb: 'PATCH',
              path: '/posts/1',
              description: 'Update post with ID 1',
            },
          ],
        },
      ],
    };
  }
}
