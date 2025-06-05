import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
      type:'postgres',
      host:config.get('DATABASE_HOST'),
      port:config.get('DATABSE_PORT'),
      username:config.get('DATABASE_USERNAME'),
      password:config.get('DATABASE_PASSWORD'),
      database:config.get('DATABASE_NAME'),
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
      synchronize:true,
    }),
    }),
    UsersModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,ChatGateway],
})
export class AppModule {}
