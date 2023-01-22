import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
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
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUser(id)
    }
}
