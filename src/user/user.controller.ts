import { Controller, Delete, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Request() req){
        return this.userService.getUser(id, req.user.userId)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteMe(@Param('id', ParseIntPipe) id:number, @Request() req){
        return this.userService.deleteMe(id, req.user.userId)
    }
}
