import { IsEnum, IsNotEmpty } from 'class-validator';

enum AllowedLang {
  en = 'en',
}

export class CreateTagDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(AllowedLang)
  lang: AllowedLang;
}
