import { Injectable } from '@nestjs/common';
import { Comment } from './interfaces/comment';
import { CommentDto } from './interfaces/comment.dto';
import * as path from 'path'
import { readFileSync } from 'fs';

@Injectable()
export class CommentsService {

    private comments: Comment[] = []

    constructor(){
        // инициализируем список комментариев из json файла
        const initCommentsPath = path.join(__dirname, '..', '..', 'public', 'initComments.json')
        console.log(`initCommentsPath = ${initCommentsPath}`)
        try {
            this.comments = JSON.parse(readFileSync(initCommentsPath, 'utf8'));
            console.log(`===Initi comments from json===`)
            console.log(this.comments)
        } catch (e) {
            console.log(e)
        }        
    }

    private _getMaxId(): number {        
        if(this.comments.length === 0)
            return 0

        return Number(Math.max(...this.comments.map(comment => comment.id)))
    }

    async findBookAllComments(bookId: number): Promise<Comment[]> {
        return this.comments.filter(comment => comment.bookId === bookId)
    }

    async create(commentDto: CommentDto): Promise<Comment> {

        const id = this._getMaxId() + 1
        const comment = {
            id     : id,
            bookId : commentDto.bookId,
            comment: commentDto.comment
        }        
        this.comments.push(comment)
        return comment
    }

    async update(id: number, commentDto: CommentDto): Promise<Comment> {

        const idx = this.comments.findIndex( comment => comment.id === id )
        if (idx === -1) return null

        this.comments[idx].bookId  = commentDto.bookId
        this.comments[idx].comment = commentDto.comment

        return this.comments[idx]
    }

    async delete(id: number): Promise<Comment> {
        const idx = this.comments.findIndex( comment => comment.id === id )
        if (idx === -1) return null

        const comment = this.comments[idx]
        this.comments.splice(idx, 1)

        return comment
    }    
}
