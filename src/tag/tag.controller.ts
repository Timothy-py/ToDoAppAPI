import { Controller, Request, UseGuards, Post, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateTagDto } from './dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @UseGuards(JwtGuard)
    @Post('')
    createTag(@Body() tagDto: CreateTagDto, @Request() req){
        console.log(tagDto)
        console.log(req.user)
        return "Tag created successfully"
    }
}
