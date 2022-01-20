import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Post from './Post';
import { generateID } from '../helpers/generateId';
import { BaseEntity } from './Entity';
import { User } from './User';
import { Vote } from './Vote';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment extends BaseEntity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, vote => vote.comment)
  votes: Vote[]

  protected userVote: number
  setUserVote(user: User) {
    const index = this.votes?.findIndex(vote => vote.username === user.username)
    this.userVote = index > -1 ? this.votes[index].value : 0

  }


  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = generateID(8);
  }
}
