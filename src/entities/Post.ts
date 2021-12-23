import {
  BeforeInsert,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  OneToMany,
  Entity,
} from 'typeorm';
import { generateID, slugify } from '../helpers/generateId';
import Sub from './Sub';
import { BaseEntity } from './Entity';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export default class Post extends BaseEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 Character Id

  @Column()
  title: string;
  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @BeforeInsert()
  generateIDandSlug() {
    this.identifier = generateID(7);
    this.slug = slugify(this.title);
  }
}
