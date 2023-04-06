import { Body, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { CreateTodoDto, updateTodoStatusDto } from './dto';
import { TodoService } from './todo.service';
import { BasePath, GetUser } from 'src/decorators';
import { UpdateTodoDto } from './dto/update.todo.dto';

@BasePath('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @HttpCode(201)
    @Post('')
    createTodo(
        @Body() todoDto: CreateTodoDto,
        @GetUser('sub') userId:number
    ){
        return this.todoService.createTodo(userId, todoDto)
    }


    @HttpCode(200)
    @Get()
    getTodos(
        @GetUser('sub') userId:number
    ){
        return this.todoService.getTodos(userId)
    }

    @Get(':id')
    getTodo(
        @GetUser('sub') userId:number, 
        @Param('id', ParseIntPipe) todoId:number
    ){
        return this.todoService.getTodo(userId, todoId)
    }

    @Patch(':id/status')
    updateStatus(
        @Body() dto: updateTodoStatusDto, 
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number,
        @Res() res
    ){
        return this.todoService.updateStatus(dto, id, userId, res)
    }

    @HttpCode(200)
    @Put(':id')
    updateTodo(
        @Body() dto: UpdateTodoDto,
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number
    ){
        return this.todoService.updateTodo(dto, id, userId)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteTodo(
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number
    ){
        return this.todoService.deleteTodo(id, userId)
    }
}
