import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials:true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messagesService:MessagesService){}

    
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;

    try {
      const payload = this.verifyToken(token);
      client.data.userId = payload.sub; // Store sender's user ID
      client.join(payload.sub); // Join a room named after userId
      console.log(`Client connected: ${client.id}, User ID: ${payload.sub}`);
    } catch (err) {
      console.log('Invalid token. Disconnecting...');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
 async handleSendMessage(
    client: Socket,
    payload: { to: string; content: string }
  ) {
    const { to, content } = payload;
    console.log(payload)
try{
    const dto={ 
        content: content,
        receiverId: +to
        }
    await this.messagesService.sendMessage(client.data.userId,dto);
}
catch(err){}
    this.server.emit(`receive_message_${payload.to}`, {
      content,
      from: client.data.userId,
    });
  }

  private verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
