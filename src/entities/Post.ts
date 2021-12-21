import { Column, Entity as ToEntity, JoinColumn, ManyToOne } from "typeorm";
import User from "./User";
import Entity from './Entity'

@ToEntity('posts')
export default class Post extends Entity {
    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, post)
    }

    @Column()
    identifier: string // 7 Character Id

    @Column()
    title: string

    @Column()
    slug: string

    @Column({ nullable: true, type: 'text' })
    body: string

    @Column()
    subName: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User




}