import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: string){
        console.log(id)
        return this.userService.getUser(id)
    }
}
