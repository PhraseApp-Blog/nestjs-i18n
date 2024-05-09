import { Module } from '@nestjs/common';
import { TodayController } from './today.controller';
import { TodayService } from './today.service';

@Module({
  providers: [TodayService],
  controllers: [TodayController],
})
export class TodayModule {}
