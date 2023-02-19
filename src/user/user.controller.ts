import {Delete, Get, HttpCode, Param, ParseIntPipe, Request, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/base-path/base-path.decorator';
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
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Request() req, @Res() res){
        return this.userService.getUser(id, req.user.userId, res)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteMe(@Param('id', ParseIntPipe) id:number, @Request() req, @Res() res){
        return this.userService.deleteMe(id, req.user.userId, res)
    }
}
