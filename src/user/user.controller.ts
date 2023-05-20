import {Body, Controller, Delete, Get, HttpCode, Put, Request} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { updateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @HttpCode(200)
    // @ApiOperation({summary: "Get all users"})
    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers()
    }


    @HttpCode(200)
    // @ApiOperation({summary: "Get a user detail/profile"})
    @Get()
    getUser(
        @GetUser('sub') userId:number
    ){
        return this.userService.getUser(userId)
    }


    @HttpCode(204)
    // @ApiOperation({summary: "Delete a user account"})
    @Delete()
    deleteMe(
        @GetUser('sub') userId:number
    ){
        return this.userService.deleteMe(userId)
    }

    @HttpCode(200)
    // @ApiOperation({summary: "Update a user account"})
    @Put()
    updateUser(
        @GetUser('sub') userId:number,
        @Body() dto: updateUserDto
    ){
        return this.userService.updateUser(userId, dto)
    }
}
