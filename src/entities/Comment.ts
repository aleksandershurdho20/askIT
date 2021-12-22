import Entity from './Entity'

import { BeforeInsert, Column, Entity as ToEntity, Index, JoinColumn, ManyToOne } from 'typeorm'
import User from './User'
import Post from './Post'
import { generateID } from '../helpers/generateId'

ToEntity()

export default class Comment extends Entity {
    constructor(comment: Partial<Comment>) {
        super()
        Object.assign(this, comment)
    }

    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = generateID(8)
    }

}


