import { IsEnum, IsNotEmpty } from 'class-validator';
import { SupportedLang } from 'src/yc-i18n/yc-i18n.service';

export class UpdateTagDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(['en', 'ar'])
  lang: SupportedLang;
}
