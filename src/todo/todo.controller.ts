import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { CreateTodoDto, updateTodoStatusDto } from './dto';
import { TodoService } from './todo.service';
import { GetUser } from 'src/decorators';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('Todo')
@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @HttpCode(201)
    // @ApiOperation({summary: "Create a todo item"})
    @Post('')
    createTodo(
        @Body() todoDto: CreateTodoDto,
        @GetUser('sub') userId:number
    ){
        return this.todoService.createTodo(userId, todoDto)
    }


    @HttpCode(200)
    // @ApiOperation({summary: "Get all my todos"})
    @Get()
    getTodos(
        @GetUser('sub') userId:number
    ){
        return this.todoService.getTodos(userId)
    }

    @HttpCode(200)
    // @ApiOperation({summary: "Get a todo item details"})
    @Get(':id')
    getTodo(
        @GetUser('sub') userId:number, 
        @Param('id', ParseIntPipe) todoId:number
    ){
        return this.todoService.getTodo(userId, todoId)
    }

    @HttpCode(200)
    // @ApiOperation({summary: "Update a todo status"})
    @Patch(':id/status')
    updateStatus(
        @Body() dto: updateTodoStatusDto, 
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number
    ){
        return this.todoService.updateStatus(dto, id, userId)
    }

    @HttpCode(200)
    // @ApiOperation({summary: "Update a todo item"})
    @Put(':id')
    updateTodo(
        @Body() dto: UpdateTodoDto,
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number
    ){
        return this.todoService.updateTodo(dto, id, userId)
    }

    @HttpCode(204)
    // @ApiOperation({summary: "Delete a todo item"})
    @Delete(':id')
    deleteTodo(
        @Param('id', ParseIntPipe) id:number,
        @GetUser('sub') userId:number
    ){
        return this.todoService.deleteTodo(id, userId)
    }
}
