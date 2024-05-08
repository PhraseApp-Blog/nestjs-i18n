import { Controller, Get } from '@nestjs/common';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(
    private readonly i18n: YcI18nService,
    private readonly infoService: InfoService,
  ) {}

  @Get()
  getInfo() {
    return this.infoService.getInfo();
  }

  @Get('about')
  getAbout() {
    return this.i18n.t('common.about');
  }
}
