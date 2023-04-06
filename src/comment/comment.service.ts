import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService){}

    async createComment(todoId:number, dto:any, email:string){
        try {
            const comment = await this.prisma.comment.create({
                data: {
                    todoId,
                    text: dto.text,
                    user: email
                }
            })

            return comment
        } catch (error) {
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
