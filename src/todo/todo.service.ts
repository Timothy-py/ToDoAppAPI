import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto';
import { UpdateTodoDto } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    // CREATE A TODO ITEM
    async createTodo(userId: number, dto: CreateTodoDto) {
        try {
            let tag_list = []
            if (dto.tags) dto.tags.forEach((tag) => {
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
                    id: true, title: true, description: true,
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
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(error.message) })
        }
    }

    // GET ALL USER TODOS
    async getTodos(id: number) {
        try {
            const todos = await this.prisma.todo.findMany({
                where: {
                    userId: id
                }
            })

            return todos
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(error.message) })
        }
    }

    // GET A TODO ITEM: DETAILS
    async getTodo(userId: number, todoId: number, res) {
        try {
            const todo = await this.prisma.todo.findFirst({
                where: {
                    id: todoId,
                    userId: userId
                },
                include: {
                    tags: true,
                    comments: true
                }
            })

            if (!todo) return res.status(204).json({})

            return res.status(200).json(todo)
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(error.message) })
        }
    }


    // UPDATE TODO STATUS
    async updateStatus(dto, todoId:number, userId:number, res) {
        try {
            const get_todo = await this.prisma.todo.findUnique({
                where: {id: todoId},
                select: {
                    userId: true
                }
            })

            if(get_todo.userId != userId) return res.status(403).json({error: 'Forbidden'})

            const todo = await this.prisma.todo.update({
                where: {
                    id: todoId
                },
                data: dto
            })

            return res.status(200).json({data: todo})
        } catch (error) {
            console.log(error.code)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // UPDATE TODO
    async updateTodo(dto: UpdateTodoDto, todoId:number, userId:number, res: Response) {
        try {
            const get_todo = await this.prisma.todo.findUnique({
                where: {id: todoId},
                select: {
                    userId: true
                }
            })

            if(get_todo.userId != userId) return res.status(403).json({error: 'Forbidden'})

            const todo = await this.prisma.todo.update({
                where: {
                    id: todoId
                },
                data: dto
            })

            return res.status(200).json()
        } catch (error) {
            
        }
    }
}
