import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto';

@Injectable()
export class TodoService {
    constructor (
        private readonly prisma: PrismaService
    ){}

    async createTodo(userId:number, dto: CreateTodoDto){
        try {
            let tag_list = []
            if(dto.tags) dto.tags.forEach((tag)=>{
                let tag_obj = {
                    title: tag,
                    userId: userId
                }

                tag_list.push(tag_obj)
            })

            const todo = await this.prisma.todo.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    status: dto.status,
                    userId: userId,
                    tags: {
                        create: tag_list
                    }
                },
                select: {
                    id:true, title: true, description: true,
                    status: true, userId: true, tags: {
                        select: {
                            title: true
                        }
                    }
                }
            })

            return {
                message: 'Todo created successfully',
                data: todo
            }
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
        }
    }
}
