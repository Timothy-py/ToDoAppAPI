import { Body, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/decorators/base-path.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@BasePath('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @UseGuards(JwtGuard)
    @Post('todo/:id')
    createComment(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) id:number, @Request() req){
        return this.commentService.createComment(id, dto.text, req.user.email)
    }
}
