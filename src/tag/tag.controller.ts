import { Post, Body, HttpCode, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { BasePath } from 'src/decorators/base-path.decorator';
import { CreateTagDto } from './dto';
import { TagService } from './tag.service';
import { GetUser} from 'src/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('Tag')
@BasePath('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @HttpCode(201)
    // @ApiOperation({summary: 'Create a tag'})
    @Post('')
    createTag(
        @Body() tagDto: CreateTagDto,
        @GetUser('sub') userId:number
    ){
        return this.tagService.createTag(userId, tagDto)
    }

    @HttpCode(204)
    // @ApiOperation({summary: 'Delete a tag'})
    @Delete(':id')
    deleteTag(
        @GetUser('sub') userId:number,
        @Param('id', ParseIntPipe) id:number
    ){
        return this.tagService.deleteTag(userId, id)
    }
}
