import { Post, Body, HttpCode, Res, UseGuards} from '@nestjs/common';
import { BasePath, Public } from 'src/decorators';
import { GeneralReturn } from 'src/types';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto'
import { Tokens } from './types/tokens.type';
import { RtGuard } from './guard';
import { GetUser } from 'src/decorators';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Authentication')
@BasePath('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  // SIGN UP API
  @Public()
  @HttpCode(201)
  @ApiOperation({summary: "User signup"})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'example@email.com',
          description: 'unique user email'
        },
        password: {
          type: "string",
          example: "*********",
          description: "secure user password"
        },
        username: {
          type: 'sfring',
          example: 'username001',
          description: "username"
        }
      }
    }
  })
  @Post('signup')
  signup(@Body() authDto: SignUpDto): Promise<GeneralReturn>{
    return this.authService.signup(authDto)
  }

  // SIGN IN API
  @Public()
  @ApiOperation({summary: "User signin"})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'example@email.com',
          description: 'unique user email'
        },
        password: {
          type: "string",
          example: "*********",
          description: "secure user password"
        }
      }
    }
  })
  @Post('signin')
  signin(@Body() authDto: SignInDto, @Res() res): Promise<Tokens>{
    return this.authService.signin(authDto, res)
  }

  // REFRESH TOKEN API
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(200)
  @ApiOperation({summary: "Refresh user access token"})
  @ApiBearerAuth('Authorization')
  @Post('refresh')
  refreshToken(
    @GetUser('sub') userId: number,
    @GetUser('refreshToken') refreshToken: string
  ): Promise<Tokens>{
    return this.authService.refreshToken(userId, refreshToken)
  }

  // LOGOUT API
  @Post('logout')
  @ApiOperation({summary: "User logout"})
  @ApiBearerAuth('Authorization')
  @HttpCode(200)
  logout(@GetUser('sub') userId:number){
    return this.authService.logout(userId)
  }
}
