import { Body, Controller, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, EditCommentDto } from './dto';
import { GetUser } from 'src/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('Comment')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @HttpCode(201)
    // @ApiOperation({summary: 'Create a comment'})
    @Post('todo/:id')
    createComment(
        @Body() dto: CreateCommentDto,
        @Param('id', ParseIntPipe) id:number, 
        @GetUser('email') email:string
    ){
        return this.commentService.createComment(id, dto, email)
    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    @Patch(':id')
    editComment(
        @Body() dto: EditCommentDto,
        @Param('id', ParseIntPipe) id:number,
        @GetUser('email') email:string
    ){
        return this.commentService.editComment(id, dto, email)
    }
}
