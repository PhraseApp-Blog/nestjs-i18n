import { Injectable } from '@nestjs/common';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';

@Injectable()
export class TodayService {
  constructor(private readonly i18n: YcI18nService) {}

  getToday() {
    return {
      quote: this.i18n.t('today.quote'),
      plannedRun: this.i18n.t('today.plannedRun', {
        args: {
          count: 4,
        },
      }),
    };
  }
}
