import { BeforeInsert, Column, Entity as ToEntity, JoinColumn, ManyToOne, Index, OneToMany } from "typeorm";
import User from "./User";
import Entity from './Entity'
import { generateID, slugify } from "../helpers/generateId";
import Sub from "./Sub";
import Comment from "./Comment";

@ToEntity('post')
export default class Post extends Entity {
    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, post)
    }
    @Index()
    @Column()
    identifier: string // 7 Character Id

    @Column()
    title: string
    @Index()
    @Column()
    slug: string

    @Column({ nullable: true, type: 'text' })
    body: string

    @Column()
    subName: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Sub, (sub) => sub.posts)
    @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
    sub: Sub



    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]


    @BeforeInsert()

    generateIDandSlug() {
        this.identifier = generateID(7)
        this.slug = slugify(this.title)
    }




}