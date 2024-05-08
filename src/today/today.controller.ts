import { Controller, Get } from '@nestjs/common';
import { TodayService } from './today.service';

@Controller('today')
export class TodayController {
  constructor(
    private readonly todayService: TodayService,
  ) {}

  @Get()
  getTodayInfo() {
    return this.todayService.getToday();
  }
}
