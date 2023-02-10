import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService){}

    async createComment(todoId:number, text:string, user:string){
        try {
            const comment = await this.prisma.comment.create({
                data: {
                    todoId,
                    text,
                    user
                }
            })

            return {
                message: 'Comment created successfully',
                data: comment
            }
        } catch (error) {
            console.log(error)
            return {
                error: error.code
            }
        }
    }
}
