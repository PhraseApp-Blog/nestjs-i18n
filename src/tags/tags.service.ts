import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SupportedLang,
  YcI18nService,
  defaultLang,
} from 'src/yc-i18n/yc-i18n.service';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagTranslation } from './entities/tag-translation.entity';
import { Tag } from './entities/tag.entity';

export type TranslatedTag = {
  id: number;
  lang: string;
  title: string;
};

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
    private readonly i18n: YcI18nService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepo.create({
      translations: [{ ...createTagDto }],
    });

    return await this.tagRepo.save(tag);
  }

  async findAll(): Promise<TranslatedTag[]> {
    const tags = await this.tagRepo.find({
      relations: { translations: true },
      where: { translations: { lang: this.i18n.lang() } },
    });

    return tags.map((tag) => this.translatedTagFor(tag)!);
  }

  async findOne(id: number): Promise<TranslatedTag | null> {
    const tag = await this.tagRepo.findOne({
      relations: { translations: true },
      where: {
        id,
        translations: { lang: this.i18n.lang() },
      },
    });

    if (!tag) {
      return null;
    }

    return this.translatedTagFor(tag);
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto,
  ): Promise<TranslatedTag | null> {
    const tag = await this.tagRepo.findOne({
      where: { id },
      relations: { translations: true },
    });

    if (!tag) {
      return null;
    }

    let translation = tag.translations.find(
      (t) => t.lang === updateTagDto.lang,
    );

    if (!translation) {
      translation = new TagTranslation();
      translation.lang = updateTagDto.lang;
      tag.translations.push(translation);
    }

    translation.title = updateTagDto.title;

    const updatedTag = await this.tagRepo.save(tag);

    return this.translatedTagFor(
      updatedTag,
      updateTagDto.lang,
    );
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tagRepo.delete(id);
    return result.affected === 1;
  }

  private translatedTagFor(
    tag: Tag,
    lang?: SupportedLang,
  ): TranslatedTag {
    lang = lang || this.i18n.lang();

    let translation =
      tag.translations.find((t) => t.lang === lang) ||
      tag.translations.find((t) => t.lang === defaultLang);

    return {
      id: tag.id,
      lang: translation!.lang,
      title: translation!.title,
    };
  }
}
