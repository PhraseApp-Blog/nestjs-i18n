import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {
  getInfo() {
    return {
      about: 'yogger chicken: a headless running forum',
      lastUpdated: new Date().toISOString(),
      routeQueryParams: [
        {
          name: 'lang',
          type: 'string',
          description: 'Language code',
        },
      ],
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
          verb: 'GET',
          path: '/posts',
          description: 'All posts',
        },
      ],
    };
  }
}
