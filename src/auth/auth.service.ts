import { ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens.type';

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
      const hash_pass = await this.hasher(dto.password)

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
      if(error.code === 'P2002') throw new HttpException('User already exist', HttpStatus.CONFLICT)
      
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
    }
  }

  // SIGN IN A USER
  async signin(dto: SignInDto, res): Promise<Tokens>{
    try {
      // find user
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email
        }
      })

      if(!user) return res.status(401).send('Invalid Credentials: User does not exist')

      // compare password
      const verify_pass = await argon.verify(user.password, dto.password)

      if(!verify_pass) return res.status(401).send('Invalid Credentials: Password incorrect')

      // sign user
      const tokens = await this.getTokens(user.id, dto.email)
      await this.updateRTHash(user.id, tokens.refresh_token)
      
      return res.status(200).json(tokens)

    } catch (error) {
      console.log(error.stack)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // refresh token
  async refreshToken(userId:number, rt:string){
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    // if user does not exist or user not logged in
    if(!user || !user.refresh_token) throw new ForbiddenException('Access Denied')

    // check if the provided RT corresponds with the DB
    const rtMatches = await argon.verify(user.refresh_token, rt)

    if(!rtMatches) throw new ForbiddenException('Access Denied!')

    const tokens = await this.getTokens(userId, user.email)

    await this.updateRTHash(userId, tokens.refresh_token)

    return tokens;
  }


  // logout API
  async logout(userId:number){
    try {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          refresh_token: {
            not: null
          }
        },
        data: {
          refresh_token: null
        }
      })
  
      return;
    } catch (error) {
      throw new HttpException('An error occured', 500)
    }
  }

  // ######################## UTILITIES ######################################
  // sign access and refresh token
  async getTokens (userId:number, email:string): Promise<Tokens> {
    const AT_SECRET = this.config.get('AT_SECRET')
    const RT_SECRET = this.config.get('RT_SECRET')

    const [at, rt] = await Promise.all([
      this.jwt.signAsync({
        sub: userId,
        email: email
      }, {
        secret: AT_SECRET,
        expiresIn: 60 * 15
      }),

      this.jwt.signAsync({
        sub: userId,
        email: email
      }, {
        secret: RT_SECRET,
        expiresIn: 60*60*24*7
      })
    ]);

    return {
      access_token: at,
      refresh_token: rt
    }
  }

  // hash and update user refresh token
  async updateRTHash(userId: number, rt: string) {
    const hash = await this.hasher(rt)
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refresh_token: hash
      }
    })
    return;
  }

  // hash any value
  async hasher(data: string){
    const hash = await argon.hash(data)
    return hash
  }
}

