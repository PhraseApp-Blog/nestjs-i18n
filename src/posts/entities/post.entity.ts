import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_en: string;

  @Column({ nullable: true })
  title_ar: string;

  @Column()
  content_en: string;

  @Column({ nullable: true })
  content_ar: string;
}
