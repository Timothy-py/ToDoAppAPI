import { Post, Body, HttpCode, Res} from '@nestjs/common';
import { BasePath, Public } from 'src/decorators';
import { GeneralReturn } from 'src/types';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto'
import { Tokens } from './types/tokens.type';


@BasePath('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @HttpCode(201)
  @Post('signup')
  signup(@Body() authDto: SignUpDto): Promise<GeneralReturn>{
    return this.authService.signup(authDto)
  }

  @Public()
  @Post('signin')
  signin(@Body() authDto: SignInDto, @Res() res): Promise<Tokens>{
    return this.authService.signin(authDto, res)
  }

  // refresh

  // logout
}
