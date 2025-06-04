import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { Users } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post()
    async createUser(@Body() createUserDto:CreateUserDto):Promise<Users>{
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll():Promise<Users[]>{
        return this.userService.findAll();
    }
}
