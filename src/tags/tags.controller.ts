import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsService, TranslatedTag } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(
    @Body() createTagDto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<TranslatedTag> {
    const tag = await this.tagsService.findOne(+id);

    if (!tag) {
      throw new NotFoundException(
        `Tag with id #${id} not found`,
      );
    }

    return tag;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TranslatedTag> {
    const translatedTag = await this.tagsService.update(
      +id,
      updateTagDto,
    );

    if (!translatedTag) {
      throw new NotFoundException(
        `Tag with id #${id} not found`,
      );
    }

    return translatedTag;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ok = await this.tagsService.remove(+id);
    if (!ok) {
      throw new NotFoundException(
        `Tag with id #${id} not found`,
      );
    }
    return { message: 'Tag deleted successfully' };
  }
}
