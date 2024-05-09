import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title_en: string;

  @IsString()
  @Length(1, 255)
  title_ar: string;

  @IsString()
  @IsNotEmpty()
  content_en: string;

  @IsString()
  content_ar: string;
}
