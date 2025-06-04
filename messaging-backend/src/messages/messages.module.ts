import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messae.entity';
import { Users } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Message,Users]), UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
