import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { InfoModule } from './info/info.module';
import { PostsModule } from './posts/posts.module';
import { TodayModule } from './today/today.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    InfoModule,
    PostsModule,
    TodayModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
