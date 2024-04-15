import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './Dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './Dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  status() {
    return 'working';
  }

  @Post('register')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  singin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }
}
