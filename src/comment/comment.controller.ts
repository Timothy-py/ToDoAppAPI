import { Body, Controller, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Post('todo/:id')
    createComment(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) id:number){
        return this.commentService.createComment(id, dto.text)
    }
}
