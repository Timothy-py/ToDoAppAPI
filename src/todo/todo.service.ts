import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto';

@Injectable()
export class TodoService {
    constructor (
        private readonly prisma: PrismaService
    ){}

    async createTodo(userId:number, dto: CreateTodoDto){
        try {
            const todo = await this.prisma.todo.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    status: dto.status,
                    userId: userId
                }
            })

            return {
                message: 'Todo created successfully',
                data: todo
            }
        } catch (error) {
            console.log(error)
            return {
                error: error.message
            }
        }
    }
}
