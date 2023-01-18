import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    select = {
        id: true,
        email: true,
        username: true,
        status: true,
        createdAt: true,
        updatedAt: true
    }

    async getAllUsers(){
        try {
            const users = await this.prisma.user.findMany({
                select: this.select
            })
            return users
        } catch (error) {
            return "An error occured."
        }
    }

    async getUser(id:number){
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                },
                select: this.select
            })

            if(!user) return "User does not exist"

            return user
        } catch (error) {
            console.log(error)
            return {
                message: "An error occured",
                error: error.message
            }
        }
    }
}
