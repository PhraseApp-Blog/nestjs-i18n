import { Module } from '@nestjs/common';
import { YcI18nModule } from 'src/yc-i18n/yc-i18n.module';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  imports: [YcI18nModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
