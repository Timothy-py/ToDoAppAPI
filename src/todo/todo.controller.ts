import { Body, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { CreateTodoDto, updateTodoStatusDto } from './dto';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/decorators';
import { UpdateTodoDto } from './dto/update.todo.dto';

@BasePath('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtGuard)
    @HttpCode(201)
    @Post('')
    createTodo(
        @Body() todoDto: CreateTodoDto, 
        @Request() req
    ){
        return this.todoService.createTodo(req.user.id, todoDto)
    }


    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get()
    getTodos(@Request() req){
        return this.todoService.getTodos(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    getTodo(
        @Request() req, 
        @Param('id', ParseIntPipe) todoId:number, 
        @Res() res 
    ){
        return this.todoService.getTodo(req.user.id, todoId, res)
    }

    @UseGuards(JwtGuard)
    @Patch(':id/status')
    updateStatus(
        @Body() dto: updateTodoStatusDto, 
        @Param('id', ParseIntPipe) id:number,
        @Request() req,
        @Res() res
    ){
        return this.todoService.updateStatus(dto, id, req.user.id, res)
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateTodo(
        @Body() dto: UpdateTodoDto,
        @Param('id', ParseIntPipe) id:number,
        @Request() req,
        @Res() res
    ){
        return this.todoService.updateTodo(dto, id, req.user.id, res)
    }

    @UseGuards(JwtGuard)
    @HttpCode(204)
    @Delete(':id')
    deleteTodo(
        @Param('id', ParseIntPipe) id:number,
        @Request() req,
    ){
        return this.todoService.deleteTodo(id)
    }
}
