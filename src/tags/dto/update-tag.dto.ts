import { IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  lang: string;
}
