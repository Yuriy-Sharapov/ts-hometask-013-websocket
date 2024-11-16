import { Injectable } from '@nestjs/common';
import { Comment } from './interfaces/comment';
import { CommentDto } from './interfaces/comment.dto';

@Injectable()
export class CommentsService {

    private comments: Comment[] = []

    private _getMaxId(): number {        
        if(this.comments.length === 0)
            return 0

        return Number(Math.max(...this.comments.map(comment => comment.id)))
    }

    async getAll(): Promise<Comment[]> {
        return this.comments
    }

    async create(commentDto: CommentDto): Promise<Comment> {

        const id = this._getMaxId() + 1
        const comment = {
            id      : id,
            bookId  : commentDto.bookId,
            comment : commentDto.comment
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
