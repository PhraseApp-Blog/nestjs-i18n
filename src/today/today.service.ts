import { Injectable } from '@nestjs/common';

@Injectable()
export class TodayService {
  getToday() {
    return {
      quote:
        'The only way to do great work is to love what you do.',
    };
  }
}
