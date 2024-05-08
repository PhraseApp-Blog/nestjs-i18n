import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfoModule } from './info/info.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [InfoModule, PostsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
