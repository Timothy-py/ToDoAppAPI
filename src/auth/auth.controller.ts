import { Post, Body, HttpCode, Res} from '@nestjs/common';
import { BasePath } from 'src/base-path/base-path.decorator';
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

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
