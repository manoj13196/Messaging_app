import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create_message.dto';
import { Message } from './messae.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService:MessagesService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendMessage(
        @Body() dto:CreateMessageDto,
        @Req() req,
    ){
        const senderId=req.user['userId'];
        return this.messagesService.sendMessage(senderId,dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getMessages(
        @Param('userId') userId:string,
        @Req() req,
    ){
        const myId=req.user['userId'];
        const otherId=parseInt(userId);
        return this.messagesService.getMessagesWith(myId, otherId);
    }
}
