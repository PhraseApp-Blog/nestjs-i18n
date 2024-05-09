import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  I18nPath,
  I18nTranslations,
} from 'src/generated/i18n.generated';

@Injectable()
export class YcI18nService {
  constructor(
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  t(key: I18nPath, options?: Record<string, any>) {
    return this.i18n.translate(key, {
      lang: this.lang(),
      ...options,
    });
  }

  lang(): 'en' | 'ar' {
    return I18nContext.current().lang as 'en' | 'ar';
  }
}
