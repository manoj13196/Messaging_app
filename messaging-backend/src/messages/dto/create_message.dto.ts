import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  // @IsNumber()
  // senderId: number;

  @IsNumber()
  receiverId: number;
}
