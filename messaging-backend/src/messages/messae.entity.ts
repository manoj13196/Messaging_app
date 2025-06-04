import { Users } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @CreateDateColumn()
    createdAt:Date;

    @ManyToOne(()=>Users, (user)=>user.sentMessages,{eager:true})
    sender:Users;

    @ManyToOne(()=>Users, (user)=>user.receivedMessages,{eager:true})
    receiver:Users;
}