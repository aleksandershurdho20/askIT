import {
  BeforeInsert,
  Column,
  Entity,
  Entity as ToEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { generateID, slugify } from '../helpers/generateId';
import Post from './Post';
import { BaseEntity } from './Entity';
import { User } from './User';
import { Expose } from 'class-transformer';

@Entity()
export default class Sub extends BaseEntity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  imageUrn: string;

  @Column({ type: 'text', nullable: true })
  bannerUrn: string;


  @Column()
  username: string

  /*
    Was doing this
    @ManyToOne(() => () => User)

    */

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Post, (post) => post.subName)
  posts: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
  }
  @Expose()
  get bannerUrl(): string | undefined {
    return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : undefined
  }

}
