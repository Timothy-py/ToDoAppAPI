import { Post, Body, HttpCode, Res, UseGuards} from '@nestjs/common';
import { BasePath, Public } from 'src/decorators';
import { GeneralReturn } from 'src/types';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto'
import { Tokens } from './types/tokens.type';
import { RtGuard } from './guard';
import { GetUser } from 'src/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Authentication')
@BasePath('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @HttpCode(201)
  @ApiOperation({summary: "User signup"})
  @Post('signup')
  signup(@Body() authDto: SignUpDto): Promise<GeneralReturn>{
    return this.authService.signup(authDto)
  }

  @Public()
  @ApiOperation({summary: "User signin"})
  @Post('signin')
  signin(@Body() authDto: SignInDto, @Res() res): Promise<Tokens>{
    return this.authService.signin(authDto, res)
  }

  // refresh
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(200)
  @ApiOperation({summary: "Refresh user access token"})
  @Post('refresh')
  refreshToken(
    @GetUser('sub') userId: number,
    @GetUser('refreshToken') refreshToken: string
  ): Promise<Tokens>{
    return this.authService.refreshToken(userId, refreshToken)
  }

  // logout
  @Post('logout')
  @ApiOperation({summary: "User logout"})
  @HttpCode(200)
  logout(@GetUser('sub') userId:number){
    return this.authService.logout(userId)
  }
}
