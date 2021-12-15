import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn } from "typeorm";
import { IsEmail, Length } from 'class-validator'

@Entity()
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        //Some of fields to be nullable , not all required 
        super();
        Object.assign(this, user)
    }
    @PrimaryGeneratedColumn()
    id: number;




    @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string



    @Index()

    @Column({ unique: true })
    username: string



    @Index()

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
    @CreateDateColumn()
    updatedAt: Date

}
