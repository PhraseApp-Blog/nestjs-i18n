import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/locales/'),
        watch: true,
      },
      typesOutputPath: path.join(
        __dirname,
        '../src/generated/i18n.generated.ts',
      ),
      resolvers: [
        new QueryResolver(['lang']),
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    YcI18nModule,
    InfoModule,
    PostsModule,
    TodayModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
