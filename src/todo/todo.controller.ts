import { Body, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/decorators';

@BasePath('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('')
    createTodo(@Body() todoDto: CreateTodoDto, @Request() req){
        return this.todoService.createTodo(req.user.id, todoDto)
    }
}
