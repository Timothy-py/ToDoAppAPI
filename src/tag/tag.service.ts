import { Injectable } from '@nestjs/common';
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

            return {
                message: 'Tag created successfully',
                data: tag
            }
        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
    }
}
