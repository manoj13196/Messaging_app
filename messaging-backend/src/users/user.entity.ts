import { Message } from "src/messages/messae.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({nullable:true})
    avatarURL:string;

    @OneToMany(()=>Message, (message)=>message.sender)
    sentMessages:Message[];

    @OneToMany(()=>Message, (message)=>message.receiver)
    receivedMessages:Message[];


}