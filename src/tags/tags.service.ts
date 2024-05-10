import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YcI18nService } from 'src/yc-i18n/yc-i18n.service';
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
    const translation = new TagTranslation();
    translation.lang = createTagDto.lang;
    translation.title = createTagDto.title;

    const tag = new Tag();
    tag.translations = [translation];

    return await this.tagRepo.save(tag);
  }

  async findAll(): Promise<TranslatedTag[]> {
    const tags = await this.tagRepo
      .createQueryBuilder('tag')
      .leftJoinAndSelect(
        'tag.translations',
        'translation',
        'translation.lang = :lang',
        { lang: this.i18n.lang() },
      )
      .getMany();

    return tags.map((tag) => ({
      id: tag.id,
      lang: tag.translations[0]?.lang || this.i18n.lang(),
      title: tag.translations[0]?.title ?? null,
    }));
  }

  async findOne(id: number): Promise<TranslatedTag | null> {
    const tag = await this.tagRepo
      .createQueryBuilder('tag')
      .leftJoinAndSelect(
        'tag.translations',
        'translation',
        'translation.lang = :lang',
        { lang: this.i18n.lang() },
      )
      .where('tag.id = :id', { id })
      .getOne();

    if (!tag) {
      return null;
    }

    return {
      id: tag.id,
      lang: tag.translations[0]?.lang,
      title: tag.translations[0]?.title,
    };
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto,
  ): Promise<TranslatedTag | null> {
    const tag = await this.tagRepo.findOne({
      where: { id },
      relations: ['translations'],
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

    await this.tagRepo.save(tag);

    return {
      id: tag.id,
      lang: translation.lang,
      title: translation.title,
    };
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tagRepo.delete(id);
    return result.affected === 1;
  }
}
