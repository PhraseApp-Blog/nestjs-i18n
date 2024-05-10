import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {
  getInfo() {
    return {
      about: 'yogger chicken: a headless running blog',
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
          description: 'Daily quote',
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
