import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './messae.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { CreateMessageDto } from './dto/create_message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepo:Repository<Message>,

        @InjectRepository(Users)
        private readonly userRepo:Repository<Users>
    ){}


    async sendMessage(senderId:number, dto: CreateMessageDto):Promise<Message>{
        const sender = await this.userRepo.findOneBy({id:senderId});
        const receiver= await this.userRepo.findOneBy({id:dto.receiverId})

        if(!sender||!receiver){
            throw new Error("Sender or receiver not found");
        }

        const message=this.messageRepo.create({
            content:dto.content,
            sender,
            receiver,
        });

        return await this.messageRepo.save(message);
    }
    
    async getMessagesWith(userId1:number, userId2:number):Promise<Message[]>{
        return this.messageRepo.find({
            where:[
                {sender:{id:userId1}, receiver:{id:userId2}},
                {sender:{id:userId2}, receiver:{id:userId1}},
            ],
            relations:['sender','receiver'],
            order:{createdAt:'ASC'},
        });
    }
}

