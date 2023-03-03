import {Body, Delete, Get, HttpCode, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BasePath } from 'src/decorators';
import { updateUserDto } from './dto';
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
    @HttpCode(204)
    @Delete()
    deleteMe(@Request() req){
        return this.userService.deleteMe(req.user.id)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Put()
    updateUser(
        @Request() req,
        @Body() dto: updateUserDto
    ){
        return this.userService.updateUser(req.user.id, dto)
    }
}
