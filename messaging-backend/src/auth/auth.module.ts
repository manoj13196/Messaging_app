import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:configService.get<string>('JWT_EXPIRES_IN'),
        }
      })
    })


  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}  
