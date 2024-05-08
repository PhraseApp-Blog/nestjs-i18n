import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { InfoModule } from './info/info.module';
import { PostsModule } from './posts/posts.module';
import { TodayModule } from './today/today.module';
import { YcI18nModule } from './yc-i18n/yc-i18n.module';

@Module({
  imports: [
    InfoModule,
    PostsModule,
    TodayModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/locales/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang']),
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    YcI18nModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
