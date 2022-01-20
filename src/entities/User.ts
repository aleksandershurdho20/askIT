import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import Post from './Post';
import { BaseEntity } from './Entity';
import { Vote } from './Vote';

@Entity()
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: 'Username must be at least 3 characters long' })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @Length(6, 255)
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  //Before a bracket is created in db operate something in database

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
