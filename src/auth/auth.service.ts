import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}

  async signup(dto: AuthDto): Promise<any>{
    try {
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

  async signin(dto: AuthDto){
    try {
      // find user
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email
        }
      })

      if(!user){
        return "Invalid credentials: Email does not exist."
      }

      // compare password
      const verify_pass = await argon.verify(user.password, dto.password)

      if(!verify_pass){
        return "Invalid credentials: Password incorrect."
      }

      // sign user
      return "User signed in successfully"
    } catch (error) {
      console.log(error.message)
      return "An error occurred"
    }
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
