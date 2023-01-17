import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(){}

    getUser(){
        return "Get user successfully"
    }
}
