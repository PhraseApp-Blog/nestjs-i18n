import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class InfoService {
  constructor(private readonly i18n: I18nService) {}

  getInfo() {
    return {
      about: this.i18n.translate('common.about', {
        lang: I18nContext.current().lang,
      }),
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
