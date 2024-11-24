import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { SocketMsgFromClient } from './interfaces/socket.msg.from.client';
import { CommentsService } from './comments/comments.service';
  
  @WebSocketGateway( { cors: true } ) // включаем политику кросдоменных запросов
  export class AppGateway {

    constructor(private readonly commentsService: CommentsService) {}

    // Получаем все сообщения для конкретной книги
    @SubscribeMessage('getAllComments')
    async onGetAllComments(@ConnectedSocket() socket: Socket): Promise<any> {
      const handshakeReferer = socket.handshake.headers.referer
      const bookId = Number(handshakeReferer.split('/')[3])

      const comments = await this.commentsService.findBookAllComments(bookId)
      return comments;
    }
    
    // Добавляем новое сообщение и рассылаем всем подписчикам
    @SubscribeMessage('addComment')
    async onAddComment(  
      @MessageBody() body: SocketMsgFromClient,
      @ConnectedSocket() socket: Socket): Promise<any>  
    {
      const handshakeReferer = socket.handshake.headers.referer
      const bookId = Number(handshakeReferer.split('/')[3])
      const commentDto = {
        bookId : bookId,
        comment: body.comment  
      }
      await this.commentsService.create(commentDto)

      let msg = { event: 'addComment', data: body }
      console.log(msg)

      // Рассылаем сообщение другим подписчикам
      socket.broadcast.emit('addComment', body);

      return msg
    }    
  }