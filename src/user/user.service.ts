import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async getAllUsers(){
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return users
    }
}
