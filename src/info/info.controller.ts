import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  getInfo() {
    return this.infoService.getInfo();
  }

  @Get('about')
  getAbout(@I18n() i18n: I18nContext) {
    return i18n.t('common.about');
  }
}
