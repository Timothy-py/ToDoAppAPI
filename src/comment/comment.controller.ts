import { Body, Controller, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @UseGuards(JwtGuard)
    @Post('todo/:id')
    createComment(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) id:number, @Request() req){
        return this.commentService.createComment(id, dto.text, req.user.email)
    }
}
