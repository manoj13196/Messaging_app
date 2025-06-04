import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
import { CreateUserDto } from 'src/users/dto/create_user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UsersService,
    ){}

    @Post('login')
    async login(@Body() loginDto:LoginDto){
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password,
        );

        return this.authService.login(user);
    }

     @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() request){
        return request.user;
    }

    @Post('register')
    async register(@Body() dto:CreateUserDto){
        return this.userService.create(dto);
    }
}
