import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './interfaces/comment';
import { CommentDto } from './interfaces/comment.dto';
import { IParamId } from './interfaces/IParamId';

@Controller('comments')
export class CommentsController {
    constructor(private readonly bookService: CommentsService) {}

    @Get()
    getAll(): Promise<Comment[]> {
        return this.bookService.getAll()
    }

    @Post()
    create(@Body() body: CommentDto): Promise<Comment> {
        return this.bookService.create(body)
    }

    @Put(':id')
    update(
        @Param() { id }: IParamId,
        @Body() body: CommentDto): Promise<Comment> {
        
        return this.bookService.update(Number(id), body)
    }

    @Delete(':id')
    delete(@Param() { id }: IParamId){
        return this.bookService.delete(Number(id))
    }    
}
