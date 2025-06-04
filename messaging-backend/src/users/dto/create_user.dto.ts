import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsOptional()
    @IsString()
    avatarUrl?:string;
}