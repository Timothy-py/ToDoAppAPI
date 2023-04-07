import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, updateTodoStatusDto } from './dto';
import { UpdateTodoDto } from './dto/update.todo.dto';

type TodoWhereUniqueInputWithUserId = Prisma.TodoWhereUniqueInput & {
    userId: number;
}

@Injectable()
export class TodoService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    // CREATE A TODO ITEM
    async createTodo(userId: number, dto: CreateTodoDto) {
        try {
            // check if any of the incoming tags already exist for the user in the DB
            let tag_list = []
            if (dto.tags){
                // fetch all user tags in the db
                const user_tags = await this.prisma.tag.findMany({
                    where:{
                        userId: userId
                    },
                    select:{
                        title: true
                    }
                })
                
                let user_tags_array = []
                user_tags.forEach((tag)=>user_tags_array.push(tag.title))

                // separate tags which do not exist in the db
                let diff = []
                dto.tags.forEach((tag)=>{
                    if(!user_tags_array.includes(tag)){
                        diff.push(tag)
                    }
                })

                // put tags into object for creation
                diff.forEach((tag) => {
                    let tag_obj = {
                        title: tag,
                        userId: userId
                    }
    
                    tag_list.push(tag_obj)
                })
            }

            // create a todo
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

            return todo
        } catch (error) {
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // GET A TODO ITEM: DETAILS
    async getTodo(userId: number, todoId: number) {
        try {
            const todo = await this.prisma.todo.findFirst({
                where: {
                    id: todoId,
                    userId: userId
                },
                include: {
                    tags: {
                        select:{
                            title: true
                        }
                    },
                    comments: {
                        select:{
                            id: true,
                            text: true,
                            user: true,
                            updatedAt: true
                        }
                    }
                }
            })

            if (!todo) throw new NotFoundException(`Todo not found!`)

            return todo
        } catch (error) {
            throw error
        }
    }

    // UPDATE TODO STATUS
    async updateStatus(dto:updateTodoStatusDto, todoId:number, userId:number) {
        try {
            const get_todo = await this.prisma.todo.findUnique({
                where: {id: todoId},
                select: {
                    userId: true
                }
            })

            if(get_todo.userId != userId) throw new ForbiddenException()

            const todo = await this.prisma.todo.update({
                where: {
                    id: todoId
                },
                data: dto
            })

            return todo
        } catch (error) {
            throw error
        }
    }

    // UPDATE TODO
    async updateTodo(dto: UpdateTodoDto, todoId:number, userId:number) {
        try {
            let update_obj = {}
            let tag_list = []

            // if there's tag to update
            if(dto.tags && dto.tags.length > 0){
                // get the tags associated witht the todo item
                const old_todo = await this.prisma.todo.findFirst({
                    where:{id: todoId},
                    select: {
                        tags: {
                            select: {
                                title: true
                            }
                        }
                    }
                })
                
                if(!old_todo) throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND)

                // put all the tags in an array
                const old_tags = []
                old_todo.tags.forEach(tag => {
                    old_tags.push(tag.title)
                });

                // separate tags which do not exist in the db
                let diff_tag = []
                dto.tags.forEach(tag =>{
                    if(!old_tags.includes(tag))
                    diff_tag.push(tag)
                })

                // put tags into object for creation
                diff_tag.forEach(tag => {
                    const tag_obj = {
                        title: tag,
                        userId: userId
                    }
                    tag_list.push(tag_obj)
                })
            }

            // fill update object
            if(dto.title) update_obj['title'] = dto.title
            if(dto.description) update_obj['description'] = dto.description
            if(dto.status) update_obj['status'] = dto.status
            if(tag_list.length > 0) update_obj['tags'] = {create: tag_list}

            // perform update 
            await this.prisma.todo.update({
                where: {
                    id: todoId
                },
                data: update_obj
            })

            return;
        } catch (error) {
            throw error
        }
    }

    // DELETE A TODO ITEM
    async deleteTodo(todoId:number, userId:number){
        try {
            await this.prisma.todo.delete({
                where: {
                    id_userId: {
                        id: todoId,
                        userId: userId
                    }
                } as TodoWhereUniqueInputWithUserId
            })
            return;
        } catch (error) {
            if(error.code === 'P2025') throw new ForbiddenException('Access denied!')

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

