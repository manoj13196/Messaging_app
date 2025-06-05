import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
    ){}

    async validateUser(email:string, password:string){
        const user=await this.usersService.findByEmail(email);
        if(!user){
            throw new UnauthorizedException('Invalid Email or Password');
        }

        const isPasswordValid=await this.usersService.validatePassword(user, password);

        if(!isPasswordValid){
            throw new UnauthorizedException("Invalid Email or Password");
        }

        return user;
    }

    async login(user:any){
        const payload={sub:user.id, email:user.email};
        const token=await this.jwtService.signAsync(payload);
        return{
            access_token:token,
            payload:payload.sub
        }
    }
}
