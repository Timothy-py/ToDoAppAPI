import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto';

@Injectable()
export class TagService {
    constructor(private readonly prisma: PrismaService){}

    async createTag(userId:number, dto:CreateTagDto){
        try {
            const tag = await this.prisma.tag.create({
                data: {
                    title: dto.title,
                    userId: userId
                }
            })

            return tag
        } catch (error) {
            if(error.code === 'P2002') throw new HttpException('Tag already exist', HttpStatus.CONFLICT)
            
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
