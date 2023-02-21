import { Body, Get, HttpCode, Param, ParseIntPipe, Post, Request, Res, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/decorators';

@BasePath('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtGuard)
    @HttpCode(201)
    @Post('')
    createTodo(@Body() todoDto: CreateTodoDto, @Request() req){
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
    getTodo(@Request() req, @Param('id', ParseIntPipe) todoId:number, @Res() res ){
        return this.todoService.getTodo(req.user.id, todoId, res)
    }
}
