import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { TodayController } from './today.controller';
import { TodayService } from './today.service';

@Module({
  imports: [PostsModule],
  providers: [TodayService],
  controllers: [TodayController],
})
export class TodayModule {}
