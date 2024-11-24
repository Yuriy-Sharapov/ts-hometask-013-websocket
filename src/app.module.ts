import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [CommentsModule],
  controllers: [AppController, CommentsController],
  providers: [AppService, AppGateway, CommentsService],
})
export class AppModule {}
