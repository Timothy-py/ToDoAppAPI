import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TodoDto } from './dto';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtGuard)
    @Post('')
    createTodo(@Body() todoDto: TodoDto, @Request() req){
        console.log(req.user.userId)
        console.log(todoDto)
        return "Todo Created Successfully"
    }
}
