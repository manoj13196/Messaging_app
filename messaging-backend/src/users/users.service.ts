import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository:Repository<Users>,
    ){}

    async create(dto:CreateUserDto):Promise<Users>{
        const hashedPassword = await bcrypt.hash(dto.password,10);
        const user=this.userRepository.create({
            email:dto.email,
            password:hashedPassword,
        });
        return await this.userRepository.save(user);
    }


    async findAll():Promise<Users[]>{
        return await this.userRepository.find();
    }

    async findByEmail(email:string):Promise<Users|null>{
        return await this.userRepository.findOne({
            where:{email},
        });
    }

    async validatePassword(
        user:Users,
        plainPassword:string,
    ):Promise<boolean>{
        return await bcrypt.compare(plainPassword, user.password);
    }
}
