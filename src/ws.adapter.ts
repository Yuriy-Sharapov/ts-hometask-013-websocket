import * as WebSocket from 'ws'
import { INestApplicationContext, WebSocketAdapter } from "@nestjs/common";
import { EMPTY, filter, fromEvent, mergeMap, Observable } from "rxjs";
import { MessageMappingProperties } from '@nestjs/websockets';

export class WsAdapter implements WebSocketAdapter {
    constructor(private app: INestApplicationContext) {}

    // создаем WebSocket сервер
    create(port: number, options: any = {}): any {
        return new WebSocket.Server({ port, ...options })
    }

    // срабатывает, как только появляется новое соединение с сокетом
    bindClientConnect(server: any, callback: Function) {
        server.on('connection', callback)
    }

    // подключаем обработчики событий, когда к нам приходят новые сообщения
    // ривязка обработчиков событий к клиентским сокетам
    bindMessageHandlers(
        client: WebSocket,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>
    ) {
        fromEvent(client, 'message')
            .pipe(
                // на каждое присланное сообщение в сокет, найти соответствующий обработчик
                mergeMap( data => this.bindMessageHandler(data, handlers, process) ),
                filter( result => result )
            )
            // Отправляем ответную информацию
            .subscribe(response => client.send(JSON.stringify(response)))
    }

    // Обработчик соответствующего типа сообщения
    bindMessageHandler(
        buffer,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>
    ): Observable<any> {

        const message = JSON.parse(buffer.data)
        const messageHandler = handlers.find(
            handler => handler.message === message.event
        )
        if (!messageHandler) {
            return EMPTY
        }
        return process(messageHandler.callback(message.data))
    }

    // Завершает работу WebSocket сервера
    close(server: any) {
        server.close()
    }
}