import { BeforeInsert, Column, Entity as ToEntity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import Entity from './Entity'
import { generateID, slugify } from "../helpers/generateId";
import Post from "./Post";

@ToEntity('subs')
export default class Sub extends Entity {
    constructor(sub: Partial<Sub>) {
        super()
        Object.assign(this, sub)
    }
    @Index()
    @Column({ unique: true })
    name: string

    @Column()
    title: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'text', nullable: true })
    imageUrn: string

    @Column({ type: 'text', nullable: true })
    bannerUrn: string

    /*
    Was doing this
    @ManyToOne(() => () => User)

    */

    @ManyToOne(() => User)

    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User


    @OneToMany(() => Post, post => post.subName)
    posts: Post[]




}