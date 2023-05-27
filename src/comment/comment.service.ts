import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditCommentDto } from './dto';

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

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    async editComment(id:number, dto:EditCommentDto, email:string){
        try {
            const old_comment = await this.prisma.comment.findUnique({
                where: {
                    id: id
                },
                select: {
                    user: true
                }
            })

            if(old_comment.user != email) throw new ForbiddenException()

            const new_comment = await this.prisma.comment.update({
                where: {
                    id: id
                },
                data: dto
            })

            return new_comment;
        } catch (error) {
            if(error.message === 'Forbidden')
                throw new ForbiddenException()
            
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    async deleteComment(id:number, email:string){
        try {
            // check if the user is the owner of the comment
            const comment = await this.prisma.comment.findUnique({
                where: {id:id},
                select: { user: true}
            });

            if(comment.user != email) throw new ForbiddenException()

            await this.prisma.comment.deleteMany({
                where: {
                    id: id,
                    user: email
                }
            })

            return;
        } catch (error) {
            if(error.message === 'Forbidden')
                throw new ForbiddenException()
            
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
