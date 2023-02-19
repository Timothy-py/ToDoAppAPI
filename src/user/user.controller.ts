import {Delete, Get, HttpCode, Param, ParseIntPipe, Request, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { BasePath, GetUser } from 'src/decorators';
import { UserService } from './user.service';

@BasePath('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @HttpCode(200)
    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers()
    }


    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get()
    getUser(@Request() req){
        return this.userService.getUser(req.user.id)
    }
    

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteMe(@Param('id', ParseIntPipe) id:number, @Request() req, @Res() res){
        return this.userService.deleteMe(id, req.user.id, res)
    }
}
