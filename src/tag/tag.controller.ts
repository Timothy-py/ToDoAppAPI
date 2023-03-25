import { Request, UseGuards, Post, Body } from '@nestjs/common';
import { BasePath } from 'src/decorators/base-path.decorator';
import { CreateTagDto } from './dto';
import { TagService } from './tag.service';

@BasePath('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post('')
    createTag(@Body() tagDto: CreateTagDto, @Request() req){
        return this.tagService.createTag(req.user.userId, tagDto)
    }
}
