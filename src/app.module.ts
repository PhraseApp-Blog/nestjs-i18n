import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfoModule } from './info/info.module';

@Module({
  imports: [InfoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
