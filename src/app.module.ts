import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfoModule } from './info/info.module';
import { PostsModule } from './posts/posts.module';
import { TodayModule } from './today/today.module';

@Module({
  imports: [InfoModule, PostsModule, TodayModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
