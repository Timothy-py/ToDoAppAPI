import { Injectable, Response } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}

  async signup(dto: AuthDto): Promise<{}>{
    try {
      console.log(dto)
      // hash the password
      const hash_pass = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          password: hash_pass,
          email: dto.email,
          username: dto.username,
          status: dto.status
        }
      })
      
      return {
        message: 'User sign up successfully',
        data: user
      }
    } catch (error) {
      // throw error
      return{
        error: error.message
      }
    }
  }

  signin(authDto: AuthDto){
    return 'User sigin successfully'
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
