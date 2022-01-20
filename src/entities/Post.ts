import {
  BeforeInsert,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  OneToMany,
  Entity,
  AfterLoad,
} from 'typeorm';
import { generateID, slugify } from '../helpers/generateId';
import Sub from './Sub';
import { BaseEntity } from './Entity';
import { User } from './User';
import { Comment } from './Comment';
import { Vote } from './Vote';

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
  username: string
  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;
  protected url: string
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[]
  @AfterLoad()
  createFields() {
    this.url = `/r/${this.subName}/${this.identifier}/${this.slug}`
  }
  @BeforeInsert()
  generateIDandSlug() {
    this.identifier = generateID(7);
    this.slug = slugify(this.title);
  }
}
