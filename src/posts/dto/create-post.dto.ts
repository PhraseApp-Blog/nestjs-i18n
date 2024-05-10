import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreatePostDto {
  @IsString({ message: 'validation.string' })
  @Length(1, 255, {
    message: i18nValidationMessage('validation.length'),
  })
  title_en: string;

  @IsOptional()
  @IsString({ message: 'validation.string' })
  @Length(1, 255, {
    message: i18nValidationMessage('validation.length'),
  })
  title_ar: string;

  @IsString({ message: 'validation.string' })
  @IsNotEmpty({ message: 'validation.required' })
  content_en: string;

  @IsOptional()
  @IsString({ message: 'validation.string' })
  @Length(1, 255, {
    message: i18nValidationMessage('validation.length'),
  })
  content_ar: string;
}
