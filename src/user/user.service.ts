import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    select = {
        id: true,
        email: true,
        username: true,
        todos: true,
        tags: true,
        createdAt: true,
        updatedAt: true
    }
 
    // GET ALL USERS IN DB
    async getAllUsers(){
        try {
            const users = await this.prisma.user.findMany({
                select: this.select
            })
            
            users.forEach(user => {
                user['todos'] = user['todos'].length as any
                user['tags'] = user['tags'].length as any
            });
            

            return users
        } catch (error) {
            console.log(error)
            return "An error occured."
        }
    }

    // GET A SINGLE USER DETAIL
    async getUser(id:number, userId:number){
        if(id != userId) return {
            "statusCode": 401,
            "message": "Unauthorised"
        }
        
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

    // DELETE A USER DATA
    async deleteMe(id:number, userId:number){
        if(id != userId) return {
            "statusCode": 401,
            "message": "Unauthorised"
        }
        
        try {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })

            return;
        } catch (error) {
            console.log(error)
            return {
                message: "An error occured",
                error: error.message
            }
        }
    }
}