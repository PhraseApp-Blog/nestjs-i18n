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
          description: this.i18n.t('routes.root', {
            args: { redirectedUrl: '/info' },
          }),
        },
        {
          verb: 'GET',
          path: '/info',
          description: this.i18n.t('routes.info'),
        },
        {
          verb: 'GET',
          path: '/today',
          description: this.i18n.t('routes.today'),
        },
        {
          posts: [
            {
              verb: 'GET',
              path: '/posts',
              description: this.i18n.t(
                'routes.posts.index',
              ),
            },
            {
              verb: 'GET',
              path: '/posts/1',
              description: this.i18n.t('routes.posts.one'),
            },
            {
              verb: 'POST',
              path: '/posts',
              description: this.i18n.t('routes.posts.post'),
            },
            {
              verb: 'PATCH',
              path: '/posts/1',
              description: this.i18n.t(
                'routes.posts.patch',
              ),
            },
          ],
          tags: [
            {
              verb: 'GET',
              path: '/tags',
              description: this.i18n.t('routes.tags.index'),
            },
            {
              verb: 'GET',
              path: '/tags/1',
              description: this.i18n.t('routes.tags.one'),
            },
            {
              verb: 'POST',
              path: '/tags',
              description: this.i18n.t('routes.tags.post'),
            },
            {
              verb: 'PATCH',
              path: '/tags/1',
              description: this.i18n.t('routes.tags.patch'),
            },
          ],
        },
      ],
    };
  }
}
