import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
@Index(['lang', 'tagId'], { unique: true })
export class TagTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lang: string;

  @Column()
  title: string;

  @ManyToOne(() => Tag, (tag) => tag.translations, {
    onDelete: 'CASCADE',
  })
  tag: Tag;

  @Column()
  tagId: number;
}
