import { Body, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BasePath } from 'src/decorators/base-path.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';
import { GetUser } from 'src/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('Comment')
@BasePath('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @HttpCode(200)
    // @ApiOperation({summary: 'Create a comment'})
    @Post('todo/:id')
    createComment(
        @Body() dto: CreateCommentDto,
        @Param('id', ParseIntPipe) id:number, 
        @GetUser('email') email:string
    ){
        return this.commentService.createComment(id, dto, email)
    }
}
