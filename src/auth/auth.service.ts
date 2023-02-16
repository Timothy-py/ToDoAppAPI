import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private config: ConfigService,
    private jwt: JwtService
  ){}

  // REGISTER NEW USER
  async signup(dto: SignUpDto): Promise<any>{
    try {
      // hash the password
      const hash_pass = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          password: hash_pass,
          email: dto.email,
          username: dto.username,
        }
      })

      delete user.password
      
      return {
        message: 'User sign up successfully',
        data: user
      }
    } catch (error) {
      if(error.code === 'P2002') throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
      
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
    }
  }

  // SIGN IN A USER
  async signin(dto: SignInDto, res){
    try {
      // find user
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email
        }
      })

      if(!user) return res.status(400).send('Invalid Credentials: User does not exist')

      // compare password
      const verify_pass = await argon.verify(user.password, dto.password)

      if(!verify_pass) return res.status(400).send('Invalid Credentials: Password incorrect')

      // sign user
      const token = await this.signToken(user.id, user.email)
      
      return res.status(200).json(token)

    } catch (error) {
      console.log(error.message)
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
    }
  }

  // GENERATE ACCESS TOKEN
 async signToken(userId:number, email:string): Promise<{access_token:any}> {
  const payload = {
    sub: userId,
    email
  }

  const secret = this.config.get('JWT_SECRET')

  const token = await this.jwt.signAsync(payload, {
    expiresIn: '1h',
    secret:secret
  })

  return {access_token: token}
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
