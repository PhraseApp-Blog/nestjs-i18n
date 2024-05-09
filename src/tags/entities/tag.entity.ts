import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagTranslation } from './tag-translation.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => TagTranslation,
    (translation) => translation.tag,
    { cascade: true },
  )
  translations: TagTranslation[];
}
