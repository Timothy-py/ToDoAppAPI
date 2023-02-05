import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtGuard)
    @Post('')
    createTodo(@Body() todoDto: CreateTodoDto, @Request() req){
        return this.todoService.createTodo(req.user.userId, todoDto)
    }
}
