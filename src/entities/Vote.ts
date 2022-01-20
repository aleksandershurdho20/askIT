
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Post from './Post';
import { BaseEntity } from './Entity';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Vote extends BaseEntity {
    constructor(vote: Partial<Vote>) {
        super();
        Object.assign(this, vote);
    }
    @Column()
    value: number


    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: 'username' })
    user: User

    @Column()
    username: string


    @ManyToOne(() => Post)
    post: Post


    @ManyToOne(() => Comment)
    comment: Comment

}
