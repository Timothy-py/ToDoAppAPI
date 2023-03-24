import { Post, Body, HttpCode, Res} from '@nestjs/common';
import { BasePath } from 'src/decorators';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto'


@BasePath('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @HttpCode(201)
  @Post('signup')
  signup(@Body() authDto: SignUpDto){
    return this.authService.signup(authDto)
  }

  @Post('signin')
  signin(@Body() authDto: SignInDto, @Res() res){
    return this.authService.signin(authDto, res)
  }

  // refresh

  // logout
}
