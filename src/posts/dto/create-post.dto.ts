import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'validation.string' })
  @IsNotEmpty({ message: 'validation.required' })
  @Length(1, 255, { message: 'validation.length' })
  title_en: string;

  @IsOptional()
  @IsString({ message: 'validation.string' })
  @Length(1, 255, { message: 'validation.length' })
  title_ar: string;

  @IsString({ message: 'validation.string' })
  @IsNotEmpty({ message: 'validation.required' })
  content_en: string;

  @IsOptional()
  @IsString({ message: 'validation.string' })
  content_ar: string;
}
